const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { title, categoryId } = req.body || {};

  const updatedCategory = await prisma.t_CategoryPerUser.update({
    where: { Id: categoryId },
    data: { Title: title },
    select: { Id: true },
  });

  if (updatedCategory) return res.json({ message: "Category updated successfully" });
  else return res.status(500).json({ message: "Category update failed" });
};
