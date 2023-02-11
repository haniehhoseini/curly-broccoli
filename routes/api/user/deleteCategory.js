const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { categoryId } = req.body || {};

  const removedCategory = await prisma.t_CategoryPerUser.update({
    where: { Id: categoryId },
    data: { isRemoved: true },
    select: { Id: true },
  });

  if (removedCategory)
    return res.json({ message: "Category removed successfully" });
  else return res.status(500).json({ message: "Category remove failed" });
};
