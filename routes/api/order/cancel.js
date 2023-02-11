const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { orderId } = req.body || {};

  try {
    const selectedOrder = await prisma.t_Order.findUniqueOrThrow({
      where: { Id: orderId },
      select: { Id: true, isPaid: true },
    });

    if (selectedOrder.isPaid) {
      const orderStatusSupportNeeded =
        await prisma.t_OrderStatus.findFirstOrThrow({
          where: { Name: "CancelWithSupportAttention" },
          select: { Id: true },
        });

      const updatedOrder = await prisma.t_Order.update({
        where: { Id: orderId },
        data: { OrderStatusId: orderStatusSupportNeeded.Id },
        select: { Id: true },
      });

      if (updatedOrder)
        return res.json({ message: "Order cancel requested successfully" });
      else
        return res.status(500).json({ message: "Order cancel request failed" });
    } else {
      const orderStatusCancel = await prisma.t_OrderStatus.findFirstOrThrow({
        where: { Name: "Cancel" },
        select: { Id: true },
      });

      const updatedOrder = await prisma.t_Order.update({
        where: { Id: orderId },
        data: { OrderStatusId: orderStatusCancel.Id, isSOSCancel: true },
        select: { Id: true },
      });

      if (updatedOrder)
        return res.json({ message: "Order canceled successfully" });
      else return res.status(500).json({ message: "Order cancel failed" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};
