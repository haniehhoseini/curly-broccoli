const { ROLES } = require("../../../constants/Auth");
const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { userId: _userId } = req.body || {};

  const { userId, role } = req.user || {};

  const cart = await prisma.t_Cart.findFirstOrThrow({
    where: {
      isFinilized: false,
      UserId: role === ROLES.Admin ? _userId : userId,
    },
    select: { Id: true },
  });

  if (!cart) return res.status(500).json({ message: "Cart not found" });

  const finalizedCart = await prisma.t_Cart.update({
    where: { Id: cart.Id },
    data: { isFinilized: true },
    select: { Id: true },
  });

  if (finalizedCart) {
    const orderStatus = await prisma.t_OrderStatus.findFirstOrThrow({
      where: { Name: "Pending" },
      select: { Id: true },
    });

    const order = await prisma.t_Order.create({
      data: {
        CartId: finalizedCart.Id,
        UserId: role === ROLES.Admin ? _userId : userId,
        OrderStatusId: orderStatus.Id,
        UpdateDate: new Date(),
      },
      select: { Id: true },
    });

    if (order) return res.json({ message: "Cart finalized successfully" });
    else return res.status(500).json({ message: "Cart finalize failed" });
  } else {
    return res.status(500).json({ message: "Cart finalize failed" });
  }
};
