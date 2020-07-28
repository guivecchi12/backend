const supertest = require("supertest");
// const server = require("../index")
const server = require("../server");
const db = require("../data/db.config");

// beforeEach (async () => {
//     await db.seed.run()
// })

// afterAll(async () => {
//     await db.destroy()
// })

describe("users integration tests", () => {
  //////////////    /users & /users/:id    //////////////

  it("GET /users", async () => {
    const res = await supertest(server).get("/users");

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength(5);
    expect(res.body[0].username).toBe("expat");
  });

  it("GET /users/:id", async () => {
    const res = await supertest(server).get("/users/1");

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("expat");
  });

  it("GET /users/:id (not found)", async () => {
    const res = await supertest(server).get("/users/5000000");
    expect(res.statusCode).toBe(404);
  });

  it("POST /users", async () => {
    const data = { username: "expat", password: "abc12345" };
    const res = await supertest(server).post("/users").send(data);

    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("expat");
  });

  //////////////    /users/:id/images     //////////////

  it("GET /users/:id/images", async () => {
    const res = await supertest(server).get("/users/2/images");

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength(5);
    expect(res.body[0].img_url).toBe("https://unsplash.com/photos/I-Cu1x2DUAY");
    expect(res.body[0].user_id).toBe(5);
  });

  //////////////    /users/:id/images     //////////////

  it("GET /users/:id/stories", async () => {
    const res = await supertest(server).get("/users/3/stories");

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength();
    expect(res.body[0].story_title).toBe(
      "Usa, we have the one of the richest company in the world."
    );
    expect(res.body[0].story_body).toBe(
      "Example story number 1 for user number 3."
    );
    expect(res.body[0].user_id).toBe(3);
  });
});
