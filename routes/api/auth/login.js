const { prisma } = require("../../../prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { email, password: unHashedPassword } = req.body || {};

  if (email && unHashedPassword) {
    let user;
    try {
      user = await prisma.t_User.findUnique({
        where: { Username: email },
      });
    } catch (e) {
      console.log(e);
    }

    if (user) {
      if (await bcrypt.compare(unHashedPassword, user.Password)) {
        return res.json({
          message: "Login successful",
          token: jwt.sign(
            {
              userId: user.Id,
              role: user.Role,
              isVerified: user.isVerified,
              _date: new Date().toISOString(),
            },
            process.env.JWT_SECRET,
            { expiresIn: "3h" },
          ),
        });
      }
    }
  }

  return res.json({ message: "Login failed!" });
};
