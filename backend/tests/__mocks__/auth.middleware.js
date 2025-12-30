module.exports = (req, res, next) => {
  req.user = {
    id: "test-user-id",
    role: "admin",
  };
  next();
};