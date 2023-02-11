const { ROLES } = require("../../../constants/Auth");
const { prisma } = require("../../../prisma");

module.exports = async(req, res) => {
  const { productId, userId: _userId } = req.body || {};

  const { userId, role } = req.user || {};

  try{
    const reminder = await prisma.t_RemindMeForAvailability.create({data: {ProductId: productId, UserId: role === ROLES.Admin ? _userId : userId}, select: {Id: true}});

    if(reminder) return res.json({ message: "Reminder added successfully" });
    else return res.status(500).json({ message: "Reminder add failed" });
  } catch(e){
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};
