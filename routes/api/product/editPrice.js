const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { productId, price } = req.body || {};

  try {
    const newPrice = await prisma.t_Price.create({
      data: { Price: +price, ProductId: productId },
      select: { Id: true },
    });

    if (newPrice) return res.json({ message: "Price added successfully" });
    else return res.status(500).json({ message: "Price add failed" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};
