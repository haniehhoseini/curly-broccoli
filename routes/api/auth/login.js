const { prisma } = require("../../../prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { email, password: unHashedPassword } = req.body || {};

  if (email && unHashedPassword) {
    const user = await prisma.t_User.findUnique({
      where: { email: email },
    });

    if (user) {
      const password = await bcrypt.hash(unHashedPassword, 10);

      if (password === user.password) {
        return res.json({
          message: "Login successful",
          token: jwt.sign(
            {
              userId: user.Id,
              roleId: user.RoleId,
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