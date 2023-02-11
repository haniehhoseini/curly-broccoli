const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { orderId, productId, rate } = req.body || {};

  try {
    const order = await prisma.t_Order.findUniqueOrThrow({
      where: { Id: orderId },
      select: { Id: true, CartId: true },
    });

    const ratedOrder = await prisma.t_CartProduct.update({
      where: {
        T_CartProduct_CartId_ProductId_key: {
          CartId: order.CartId,
          ProductId: productId,
        },
      },
      data: { Rate: rate },
    });

    if (ratedOrder) return res.json({ message: "Order product rated successfully" });
    else return res.status(500).json({ message: "Order rate failed" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};
