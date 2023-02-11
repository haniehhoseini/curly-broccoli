const { ROLES } = require("../../../constants/Auth");
const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const {
    birthday,
    firstName,
    lastName,
    sex,
    userId: _userId,
  } = req.body || {};

  const { userId, role } = req.user || {};
  const { filename: fileAddress } = req.file || {};
  try {
    const result = await prisma.t_Profile.upsert({
      create: {
        UserId: userId,
        PhotoAddress: fileAddress,
        Birthday: birthday ? new Date(birthday) : undefined,
        FirstName: firstName,
        LastName: lastName,
        Sex: sex ? Boolean(sex) : undefined,
      },
      update: {
        PhotoAddress: fileAddress,
        Birthday: birthday ?  new Date(birthday) : undefined,
        FirstName: firstName,
        LastName: lastName,
        Sex: sex ? Boolean(sex) : undefined,
      },
      where: { UserId: role === ROLES.Admin ? _userId : userId },
      select: {
        Id: true,
        UserId: true,
        PhotoAddress: true,
        Birthday: true,
        FirstName: true,
        LastName: true,
        Sex: true,
      },
    });

    if (result) return res.json({ message: "Profile updated successfully" });
    else return res.status(500).json({ message: "Profile update failed" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};
