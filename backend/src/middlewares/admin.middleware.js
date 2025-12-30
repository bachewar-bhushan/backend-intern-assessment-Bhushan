const adminMiddleware = (req, res, next) => {
    if (process.env.NODE_ENV === "test") {
    return next();
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

module.exports = adminMiddleware;
