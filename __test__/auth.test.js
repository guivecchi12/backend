const request = require("supertest");
const server = require("../server");
const db = require("../data/db.config");

describe("authRouter", () => {
  beforeAll(async () => {
    await db.seed.run();
  });

  // Register endpoint tests

  it("should give status code 201 when successful register", async () => {
    await request(server)
      .post("/auth/register")
      .send({ username: "test", password: "abc12345" })
      .then((response) => {
        expect(response.status).toBe(201);
      });
  });

  it("should return a 500 on error registering new user", async () => {
    await request(server)
      .post("/auth/register")
      .send({ username: "expat" })
      .then((response) => {
        expect(response.status).toBe(400);
      });
  });

  it("should give status 401 error loggin in", async () => {
    await request(server)
      .post("/auth/login")
      .send({ username: "expat", password: "abc12345" })
      .then((res) => {
        expect(res.status).toBe(401);
      });
  });

  it("should return 200 for correct login", async () => {
    await request(server)
      .post("/auth/login")
      .send({ username: "test", password: "abc12345" })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
