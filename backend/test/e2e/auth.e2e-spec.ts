import request from "supertest";
import { createTestingApp, TestingApp } from "test/setup/create-testing-app";
import { createAuthHelpers } from "test/helpers/auth.helper";
import { createAuthFixtures } from "test/fixtures/auth.fixture";

describe("/auth E2E", () => {
  let helpers: ReturnType<typeof createAuthHelpers>;
  let testingApp: TestingApp;
  const email = "user@example.com";
  const password = "userPassword";

  const { createRegisterDto, createLoginDto } = createAuthFixtures(email, password);

  beforeAll(async () => {
    testingApp = await createTestingApp();
    await testingApp.prismaService.cleanDatabase();
    helpers = createAuthHelpers(testingApp.httpServer, createRegisterDto, createLoginDto);
  });

  afterEach(async () => {
    await testingApp.prismaService.cleanDatabase();
  });

  afterAll(async () => {
    await testingApp.app.close();
  });

  describe("Register", () => {
    it("should fail to register if the email is invalid", async () => {
      await helpers.register(createRegisterDto({ email: "invalidEmail" })).expect(422);
    });

    it("should fail if passwords do not match", async () => {
      await helpers.register(createRegisterDto({ confirmPassword: "invalidPassword" })).expect(422);
    });

    it("should fail to register if a required field is missing", async () => {
      const registerDto = createRegisterDto();
      const { confirmPassword, ...missingFieldRegisterDto } = registerDto;
      await helpers.register(missingFieldRegisterDto).expect(422);
    });

    it("should fail to register if there is an extra field", async () => {
      const registerDto = createRegisterDto();
      const extraFieldRegisterDto = { extraField: "extra", ...registerDto };
      await helpers.register(extraFieldRegisterDto).expect(422);
    });

    it("should register", async () => {
      const res = await helpers.register().expect(201);
      expect(res.body).toHaveProperty("accessToken");
      expect(res.headers["set-cookie"]).toBeDefined();
    });
  });

  describe("Login", () => {
    beforeEach(async () => {
      await helpers.register();
    });

    it("should fail to login if the email is invalid", async () => {
      await helpers.login(createLoginDto({ email: "invalidEmail" })).expect(422);
    });

    it("should fail to login if a required field is missing", async () => {
      const loginDto = createLoginDto();
      const { password, ...missingFieldLoginDto } = loginDto;
      await helpers.login(missingFieldLoginDto).expect(422);
    });

    it("should fail to login if there is an extra field", async () => {
      const loginDto = createLoginDto();
      const extraFieldLoginDto = { extraField: "extra", ...loginDto };
      await helpers.login(extraFieldLoginDto).expect(422);
    });

    it("should login", async () => {
      const res = await helpers.login().expect(200);
      expect(res.body).toHaveProperty("accessToken");
      expect(res.headers["set-cookie"]).toBeDefined();
    });
  });

  describe("Refresh", () => {
    it("should refresh both the access token and refresh token", async () => {
      const refreshTokenCookie = helpers.retrieveRefreshTokenCookie(await helpers.register());
      const res = await request(testingApp.httpServer)
        .post("/auth/refresh")
        .set({
          Cookie: refreshTokenCookie,
        })
        .expect(200);
      expect(res.body).toHaveProperty("accessToken");
      expect(res.headers["set-cookie"]).toBeDefined();
    });
  });

  describe("Logout", () => {
    it("should logout", async () => {
      const accessToken = helpers.retrieveAccessToken(await helpers.register());
      await request(testingApp.httpServer)
        .post("/auth/logout")
        .set({
          Authorization: `Bearer ${accessToken}`,
        })
        .expect(200);
    });
  });
});
