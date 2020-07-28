const request = require("supertest");
const server = require("../server");
const db = require("../data/db.config");

// Register endpoint tests
describe("register", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it("should give status code 201 when successful register", () => {
    return request(server)
      .post("/auth/register")
      .send({ username: "expat", password: "abc12345" })
      .then((response) => {
        expect(response.status).toBe(201);
      });
  });
  it("should return a 500 on error registering new user", () => {
    return request(server)
      .post("/auth/register")
      .send({ username: "expat" })
      .then((response) => {
        expect(response.status).toBe(400);
      });
  });
});

describe("login", () => {
  it("should give status code 201 when successful register", () => {
    return request(server)
      .post("/auth/register")
      .send({ username: "expat", password: "abc12345" })
      .then((response) => {
        expect(response.status).toBe(201);
      });
  });
  it("should give status 401 error loggin in", () => {
    return request(server)
      .post("/auth/login")
      .send({ username: "expat", password: "abc12345" })
      .then((res) => {
        expect(res.status).toBe(401);
      });
  });

  it("should return 200 for correct login", () => {
    return request(server)
      .post("/auth/login")
      .send({ username: "expat", password: "abc12345" })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
