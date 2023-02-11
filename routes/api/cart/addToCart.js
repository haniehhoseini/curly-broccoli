const { ROLES } = require("../../../constants/Auth");
const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { userId: _userId, productId, quantity } = req.body || {};

  const { userId, role } = req.user || {};

  let cart = await prisma.t_Cart.findFirstOrThrow({
    where: {
      isFinilized: false,
      UserId: role === ROLES.Admin ? _userId : userId,
    },
    select: { Id: true },
  });

  if (!cart) {
    cart = await prisma.t_Cart.create({
      data: { UserId: role === ROLES.Admin ? _userId : userId },
      select: { Id: true },
    });
  }

  if (quantity <= 0) {
    const removedItem = await prisma.t_CartProduct.delete({
      where: {
        T_CartProduct_CartId_ProductId_key: {
          CartId: cart.Id,
          ProductId: productId,
        },
      },
      select: { Id: true },
    });

     if (removedItem) {
       return res.json({ message: "Product removed from cart successfully" });
     } else {
       return res.status(500).json({ message: "Product remove from cart failed!" });
     }
  } else {
    const latestPrice = await prisma.t_Price.findFirstOrThrow({
      where: { ProductId: productId },
      select: { Id: true },
      orderBy: { CreateDate: "desc" },
    });

    const addedProduct = await prisma.t_CartProduct.upsert({
      where: {
        T_CartProduct_CartId_ProductId_key: {
          CartId: cart.Id,
          ProductId: productId,
        },
      },
      create: {
        CartId: newCart.Id,
        ProductId: productId,
        PriceId: latestPrice.Id,
        Quantity: quantity ?? 1,
      },
      update: { PriceId: latestPrice.Id, Quantity: quantity ?? 1 },
      select: { Id: true },
    });

    if (addedProduct) {
      return res.json({ message: "Product added to cart successfully" });
    } else {
      return res.status(500).json({ message: "Product add to cart failed" });
    }
  }
};
