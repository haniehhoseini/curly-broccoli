const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { productId, title, description, categoryId, quantity } =
    req.body || {};
  const { filename: fileAddress } = req.file || {};

  try {
    const updatedProduct = await prisma.t_Product.update({
      where: { Id: productId },
      data: {
        Title: title,
        Description: description,
        CoverImage: fileAddress,
        ProductCategoryId: categoryId,
        Quantity: quantity,
      },
      select: { Id: true },
    });

    if (updatedProduct)
      return res.json({ message: "Product updated successfully" });
    else return res.status(500).json({ message: "Product update failed" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Product update failed" });
  }
};
