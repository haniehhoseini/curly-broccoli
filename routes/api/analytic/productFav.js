const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { productId, startDate, endDate } = req.body || {};

  const products = await prisma.t_Order.findMany({
    where: {
      UpdateDate: { gte: startDate, lte: endDate },
      isPaid: true,
      T_Cart: { T_CartProduct: { some: { ProductId: productId } } },
    },
    select: {
      Id: true,
      T_Cart: {
        select: {
          Id: true,
          isFinilized: true,
          CreateDate: true,
          T_User: { select: { Id: true, Username: true } },
        },
        include: {
          T_CartProduct: {
            select: {
              Id: true,
              Quantity: true,
              T_Price: { select: { Id: true, Price: true, CreateDate: true } },
              Rate: true,
            },
            where: { ProductId: productId },
          },
        },
      },
    },
  });

    return res.json({ message: "Order Retrieved Successfully", data: products });
};
