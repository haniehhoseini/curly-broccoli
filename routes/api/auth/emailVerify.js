const jwt = require("jsonwebtoken");
const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { verifyToken, token } = req.params || {};

  if (verifyToken && token) {
    const { userId } = (await jwt.verify(token, process.env.JWT_SECRET)) || {};

    if (userId) {
      const user = await prisma.t_User.findUnique({
        where: { Id: userId },
      });

      if (user) {
        if (user.isVerified) return res.json({ message: "Already verified!" });
        else if (user.VerifyToken === verifyToken) {
          await prisma.t_User.update({
            where: { Id: userId },
            data: { isVerified: true },
          });

          return res.json({ message: "Verification successful!" });
        }
      }
    }
  }

  return res.json({ message: "Verification Failed!" });
};
