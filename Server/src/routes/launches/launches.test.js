const request = require("supertest");
const app = require("../../app");

describe("Test for GET launches", () => {
  test("The response should 200:OK", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const fullLaunchData = {
    mission: "Leaving Earth",
    rocket: "Senior Collo II",
    target: "Kepler 442-b",
    launchDate: "January 3, 2030",
  };

  const noLaunchDateData = {
    mission: "Leaving Earth",
    rocket: "Senior Collo II",
    target: "Kepler 442-b",
  };

  const wrongDateData = {
    mission: "Leaving Earth",
    rocket: "Senior Collo II",
    target: "Kepler 442-b",
    launchDate: "January",
  };

  test("Test status should be 201, Created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(fullLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(fullLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(noLaunchDateData);
  });

  test("It should catch missing properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(noLaunchDateData)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required properties",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(wrongDateData)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid date",
    });
  });
});
