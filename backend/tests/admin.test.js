jest.mock("../src/controllers/admin.controller", () => ({
  getAllUsers: (req, res) =>
    res.status(200).json({ success: true, users: [] }),

  activateUser: (req, res) =>
    res.status(200).json({ success: true }),

  deactivateUser: (req, res) =>
    res.status(200).json({ success: true }),

  deleteUser: (req, res) =>
    res.status(200).json({ success: true }),
}));

jest.mock("../src/middlewares/auth.middleware", () => (req, res, next) => {
  req.user = { id: "test-user-id", role: "admin" };
  next();
});

jest.mock("../src/middlewares/admin.middleware", () => (req, res, next) => {
  next();
});

const request = require("supertest");
const app = require("../src/app");

describe("Admin APIs", () => {
  it("should fetch all users (admin only)", async () => {
    const res = await request(app).get("/api/admin/users");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should deactivate a user", async () => {
    const res = await request(app)
      .patch("/api/admin/users/test-user-id/deactivate");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should activate a user", async () => {
    const res = await request(app)
      .patch("/api/admin/users/test-user-id/activate");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
