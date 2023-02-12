const { prisma } = require("../../../prisma");
const { ROLES } = require("../../../constants/Auth");

module.exports = async (req, res) => {
  const { startDate, endDate, userId: _userId } = req.body || {};

  const { userId, role } = req.user || {};

  const orders = await prisma.t_Order.findMany({
    where: {
      AND: [
        { UserId: role === ROLES.Admin ? _userId : userId },
        { OrderDate: { gte: startDate, lte: endDate } },
      ],
    },
    select: {
      Id: true,
      OrderDate: true,
      T_OrderStatus: { select: { Name: true } },
      CreateDate: true,
      isPaid: true,
      isSOSCancel: true,
      T_SupportUser: { select: { Id: true, Username: true } },
      UpdateDate: true,
      T_Cart: {
        select: {
          Id: true,
          CreateDate: true,
          isFinilized: true,
        },
        include: {
          T_CartProduct: {
            select: {
              Id: true,
              Quantity: true,
              T_Price: { select: { Id: true, Price: true, CreateDate: true } },
              Rate: true,
            },
          },
        },
      },
    },
  });

  return res.json({ message: "Order Retrieved Successfully", data: orders });
};
