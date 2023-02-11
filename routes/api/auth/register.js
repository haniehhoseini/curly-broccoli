const bcrypt = require("bcrypt");
const SHA256 = require("crypto-js/sha256");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../../prisma");

async function checkUserDuplication(req) {
  const { email, password: unHashedPassword } = req.body || {};

  if (email) {
    const user = await prisma.t_User.findUnique({ where: { Username: email } });

    if (user && !user.isVerified) {
      if (await bcrypt.compare(unHashedPassword, user.Password)) {
        sendVerificationMail(user, generateToken(user))
          .then(() => {})
          .catch(() => {});

        return null;
      }
      return true;
    }
  }

  return false;
}

async function registration(req) {
  const { email, password: unHashedPassword } = req.body || {};

  if (email && unHashedPassword) {
    const password = await bcrypt.hash(unHashedPassword, 10);
    const verifyToken = SHA256(String(Math.random())).toString();

    let user;

    try {
      user = await prisma.t_User.create({
        data: {
          Username: email,
          Password: password,
          VerifyToken: verifyToken,
        },
        select: {
          Id: true,
          Username: true,
          Password: true,
          Role: true,
          VerifyToken: true,
          isVerified: true,
        },
      });
    } catch (e) {
      console.log(e);
    }

    return user;
  }
}

async function sendVerificationMail(user, token) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    port: 587,
    secure: false,
    auth: {
      user: "Maryam2001jamaat@gmail.com",
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: "",
    to: user.Username,
    subject: "Minimal Store Verification Email",
    html: `<div><h1>Verify</h1> <h3>Please Click on link below: </h3> <a href="${process.env.HOST}/api/auth/emailVerify/${user.VerifyToken}?token=${token}">Verify!</a></div>`, // html body
  });

  return info;
}

function generateToken(user) {
  return jwt.sign(
    {
      userId: user.Id,
      role: user.Role,
      isVerified: user.isVerified,
      _date: new Date().toISOString(),
    },
    process.env.JWT_SECRET,
    { expiresIn: "3h" },
  );
}

module.exports = async (req, res) => {
  const isUserDuplicate = await checkUserDuplication(req);

  if (!isUserDuplicate && isUserDuplicate !== null) {
    const {VerifyToken ,...user} = await registration(req) || {};

    if (user) {
      const token = generateToken(user);
      const mailRes = sendVerificationMail(user).catch(() => {});

      return res.json({
        message: "Registration successful!",
        data: { ...user },
        verifyURL: encodeURI(
          `${process.env.HOST}/api/auth/emailVerify/${VerifyToken}/${token}`,
        ),
        token,
      });
    }
  } else if (isUserDuplicate === null) {
    return res.json({
      message: "Registration failed! But Verification Send Instead!",
    });
  } else if (isUserDuplicate) {
    return res.json({ message: "User already exists!" });
  }

  return res.json({ message: "Registration failed!" });
};
