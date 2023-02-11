const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { title, description, categoryId, quantity } = req.body || {};
  const { filename: fileAddress } = req.file || {};

  try {
    const newProduct = await prisma.t_Product.create({
      data: {
        Title: title,
        Description: description,
        CoverImage: fileAddress,
        ProductCategoryId: categoryId,
        Quantity: quantity,
      },
      select: { Id: true },
    });

    if (newProduct) return res.json({ message: "Product added successfully" });
    else return res.status(500).json({ message: "Product add failed" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Product add failed" });
  }
};
