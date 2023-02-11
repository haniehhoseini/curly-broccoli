const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { orderId } = req.body || {};

  try {
    const orderStatusPaid = await prisma.t_OrderStatus.findFirstOrThrow({
      where: { Name: "Paid" },
      select: { Id: true },
    });

    const selectedOrder = await prisma.t_Order.update({
      where: { Id: orderId },
      data: { OrderStatusId: orderStatusPaid.Id, isPaid: true },
      select: { Id: true },
    });

    if(selectedOrder) return res.json({ message: "Order paid successfully" });
    else return res.status(500).json({ message: "Order pay failed" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};
