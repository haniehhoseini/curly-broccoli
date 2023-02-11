const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { orderId } = req.body || {};

  const { userId } = req.user || {};

  try {
    const orderStatusAccepted = await prisma.t_OrderStatus.findFirstOrThrow({
      where: { Name: "Accepted" },
      select: { Id: true },
    });

    const selectedOrder = await prisma.t_Order.update({
      where: { Id: orderId },
      data: {
        OrderStatusId: orderStatusAccepted.Id,
        SupportUserId: userId,
        UpdateDate: new Date(),
      },
      select: { Id: true },
    });

    if (selectedOrder)
      return res.json({ message: "Order accepted successfully" });
    else return res.status(500).json({ message: "Order accept failed" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};
