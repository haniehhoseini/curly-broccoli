const jwt = require("jsonwebtoken");

exports.Authorization = (acceptedRoles) => {
  return async (req, res, next) => {
    const authHeader = req.headers?.authorization?.split?.(" ")?.[1];

    if (authHeader) {
      const result = await jwt.decode(authHeader);

      if (result) {
        const { userId, role, isVerified } = result;
        if (!isVerified)
          return res.status(403).json({ message: "UnVerified!" });

        if (userId && role) {
          if (acceptedRoles.includes(role)) {
            req.user = { userId, role };
            return next();
          }
        }
      }
    }
    return res.status(401).json({ message: "Unauthorized" });
  };
};
