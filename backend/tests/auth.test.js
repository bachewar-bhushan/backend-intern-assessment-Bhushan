const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User");
const bcrypt = require("bcryptjs");

const {
  connect,
  closeDatabase,
  clearDatabase,
} = require("./setupTestDB");

beforeAll(async () => {
  await connect();

  await User.create({
    fullName: "Admin User",
    email: "admin@example.com",
    password: await bcrypt.hash("Password@123", 10),
    role: "admin",
  });
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe("Auth API", () => {
  it("should login user successfully", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@example.com",
        password: "Password@123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
