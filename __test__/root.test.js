const request = require("supertest");
const server = require("../server");
const db = require("../data/db.config");

describe("users images and stories", () => {
  beforeEach(async () => {
    await db.raw('PRAGMA journal_mode = "OFF"');
    await db.seed.run();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it("GET /images", async () => {
    const res = await request(server).get("/images");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
  });

  it("GET /stories", async () => {
    const res = await request(server).get("/stories");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
  });
});
