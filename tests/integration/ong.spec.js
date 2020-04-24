const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ong", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("shoulb be able to create a new ONG", async () => {
    const response = await request(app).post("/ongs").send({
      name: "APAD 2",
      email: "contato@apad.com",
      whatsapp: "1234567890",
      city: "Ituverava",
      uf: "SP",
    });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
