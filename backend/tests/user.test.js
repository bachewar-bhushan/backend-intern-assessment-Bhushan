/**
 * tests/user.test.js
 * FULL FILE — COPY & PASTE AS IS
 * --------------------------------
 * This test mocks:
 * - user.controller (ALL handlers used by routes)
 * - auth.middleware
 * So NO DB, NO JWT, NO cookies are required.
 */

/* ===================== MOCKS (MUST BE AT TOP) ===================== */

// Mock user controller (ALL exports used in user.routes.js)
jest.mock("../src/controllers/user.controller", () => ({
  getMyProfile: (req, res) =>
    res.status(200).json({
      success: true,
      user: {
        id: "test-user-id",
        fullName: "Test User",
        email: "test@example.com",
      },
    }),

  updateMyProfile: (req, res) =>
    res.status(200).json({
      success: true,
      message: "Profile updated",
    }),

  changePassword: (req, res) =>
    res.status(200).json({
      success: true,
      message: "Password changed",
    }),
}));

// Mock auth middleware
jest.mock("../src/middlewares/auth.middleware", () => {
  return (req, res, next) => {
    req.user = {
      id: "test-user-id",
      role: "user",
    };
    next();
  };
});

/* ===================== IMPORTS ===================== */

const request = require("supertest");
const app = require("../src/app");

/* ===================== TESTS ===================== */

describe("User APIs", () => {
  it("should get my profile", async () => {
    const res = await request(app).get("/api/users/me");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.fullName).toBe("Test User");
  });

  it("should update my profile", async () => {
    const res = await request(app)
      .put("/api/users/me")
      .send({
        fullName: "Updated User",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should change password", async () => {
    const res = await request(app)
      .put("/api/users/me/password")
      .send({
        oldPassword: "OldPass@123",
        newPassword: "NewPass@123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
