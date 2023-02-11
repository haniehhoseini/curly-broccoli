const { prisma } = require("../../../prisma");

module.exports = async (req, res) => {
  const { q, page = 1  } = req.query || {};

  const products = await prisma.t_Product.findMany({
    where: {
      OR: [{ Description: { contains: q } }, { Title: { contains: q } }],
    },
    skip: +page * 10,
    take: 10,
    orderBy: { CreateDate: "desc" },
  });

  return res.json({
    message: "Products fetched successfully",
    data: [...products],
  });
};
