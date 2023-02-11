const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { title } = req.body || {};
  const { userId } = req.user || {};

  const newCategory = await prisma.t_CategoryPerUser.create({
    data: { Title: title, UserId: userId },
    select: { Id: true },
  });

  if (newCategory) return res.json({ message: "Category added successfully" });
  else return res.status(500).json({ message: "Category add failed" });
};
