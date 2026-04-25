import request from "supertest";
import { createTestingApp, TestingApp } from "test/setup/create-testing-app";
import { createAuthHelpers } from "test/helpers/auth.helper";
import { createAuthFixtures } from "test/fixtures/auth.fixture";

describe("/users E2E", () => {
  let testingApp: TestingApp;
  let helpers: ReturnType<typeof createAuthHelpers>;
  const email = "user@example.com";
  const password = "userPassword";

  beforeAll(async () => {
    testingApp = await createTestingApp();
    await testingApp.prismaService.cleanDatabase();
    const { createRegisterDto, createLoginDto } = createAuthFixtures(email, password);
    helpers = createAuthHelpers(testingApp.httpServer, createRegisterDto, createLoginDto);
  });

  afterEach(async () => {
    await testingApp.prismaService.cleanDatabase();
  });

  afterAll(async () => {
    await testingApp.app.close();
  });

  let accessToken: string;

  beforeEach(async () => {
    accessToken = helpers.retrieveAccessToken(await helpers.register());
  });

  describe("Get me", () => {
    it("should get me", async () => {
      await request(testingApp.httpServer)
        .get("/users/me")
        .set({
          Authorization: `Bearer ${accessToken}`,
        })
        .expect(200);
    });

    it("should fail to get me with a 404 Not Found status code", async () => {
      await testingApp.prismaService.user.delete({
        where: {
          email: email,
        },
      });

      await request(testingApp.httpServer)
        .get("/users/me")
        .set({
          Authorization: `Bearer ${accessToken}`,
        })
        .expect(404);
    });

    afterEach(async () => {
      await testingApp.prismaService.cleanDatabase();
    });
  });
  describe("Edit user", () => {});
});
