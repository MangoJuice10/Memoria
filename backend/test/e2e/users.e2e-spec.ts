import request from "supertest";
import { createTestingApp, TestingApp } from "test/setup/create-testing-app";
import { createAuthHelpers } from "test/helpers/auth.helper";
import { createAuthFixtures } from "test/fixtures/auth.fixture";
import { UpdateUserDto } from "src/user/schemas";
import { ErrorDetail } from "src/common/types";

describe("/users E2E", () => {
  let testingApp: TestingApp;

  const username = "username";
  const email = "email@example.com";
  const password = "password";

  const { createRegisterDto, createLoginDto } = createAuthFixtures(username, email, password);
  let helpers: ReturnType<typeof createAuthHelpers>;

  let accessToken: string;

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
  });

  describe("Update user", () => {
    describe("Update username", () => {
      it("should update the username", async () => {
        const newUsername = "New username";
        const updateUserDto: UpdateUserDto = {
          newUsername: newUsername,
        };

        const res = await request(testingApp.httpServer)
          .patch("/users/me")
          .set({
            Authorization: `Bearer ${accessToken}`,
          })
          .send(updateUserDto)
          .expect(200);
        expect(res.body.data.username).toEqual(newUsername);
      });

      it("should fail to update username", async () => {
        const shortUsername = "A";
        const updateUserDto: UpdateUserDto = {
          newUsername: shortUsername,
        };

        await request(testingApp.httpServer)
          .patch("/users/me")
          .set({
            Authorization: `Bearer ${accessToken}`,
          })
          .send(updateUserDto)
          .expect(422);
      });
    });

    describe("Update email", () => {
      it("should update the email", async () => {
        const newEmail = "newemail@example.com";
        const updateUserDto: UpdateUserDto = {
          newEmail: newEmail,
        };

        const res = await request(testingApp.httpServer)
          .patch("/users/me")
          .set({
            Authorization: `Bearer ${accessToken}`,
          })
          .send(updateUserDto)
          .expect(200);
        expect(res.body.data.email).toEqual(newEmail);
      });

      it("should fail to update email with a 422 Unprocessable Entity status code", async () => {
        const invalidEmail = "invalidemail";
        const updateUserDto: UpdateUserDto = {
          newEmail: invalidEmail,
        };

        await request(testingApp.httpServer)
          .patch("/users/me")
          .set({
            Authorization: `Bearer ${accessToken}`,
          })
          .send(updateUserDto)
          .expect(422);
      });

      it("should fail to update email with a 409 Conflict status code", async () => {
        const takenEmail = "takenEmail@example.com";

        await helpers.register(
          createRegisterDto({
            email: takenEmail,
          }),
        );

        const updateUserDto: UpdateUserDto = {
          newEmail: takenEmail,
        };

        await request(testingApp.httpServer)
          .patch("/users/me")
          .set({
            Authorization: `Bearer ${accessToken}`,
          })
          .send(updateUserDto)
          .expect(409);
      });
    });

    describe("Update password", () => {
      it("should update the password", async () => {
        const oldPassword = password;
        const newPassword = "newpassword";
        const confirmPassword = "newpassword";
        const updateUserDto: UpdateUserDto = {
          oldPassword,
          newPassword,
          confirmPassword,
        };

        await request(testingApp.httpServer)
          .patch("/users/me")
          .set({
            Authorization: `Bearer ${accessToken}`,
          })
          .send(updateUserDto)
          .expect(200);
      });

      it("should fail to update the password due to empty oldPassword", async () => {
        const newPassword = "newpassword";
        const confirmPassword = "newpassword";
        const updateUserDto: UpdateUserDto = {
          newPassword,
          confirmPassword,
        };

        const res = await request(testingApp.httpServer)
          .patch("/users/me")
          .set({
            Authorization: `Bearer ${accessToken}`,
          })
          .send(updateUserDto)
          .expect(422);
        expect(
          res.body.error.details.find(({ path }: ErrorDetail) => path.includes("oldPassword")),
        ).toBeDefined();
      });

      it("should fail to update the password due to empty newPassword", async () => {
        const oldPassword = password;
        const confirmPassword = "newpassword";
        const updateUserDto: UpdateUserDto = {
          oldPassword,
          confirmPassword,
        };

        const res = await request(testingApp.httpServer)
          .patch("/users/me")
          .set({
            Authorization: `Bearer ${accessToken}`,
          })
          .send(updateUserDto)
          .expect(422);
        expect(
          res.body.error.details.find(({ path }: ErrorDetail) => path.includes("newPassword")),
        ).toBeDefined();
      });

      it("should fail to update the password due to empty confirmPassword", async () => {
        const oldPassword = password;
        const newPassword = "newpassword";
        const updateUserDto: UpdateUserDto = {
          oldPassword,
          newPassword,
        };

        const res = await request(testingApp.httpServer)
          .patch("/users/me")
          .set({
            Authorization: `Bearer ${accessToken}`,
          })
          .send(updateUserDto)
          .expect(422);
        expect(
          res.body.error.details.find(({ path }: ErrorDetail) => path.includes("confirmPassword")),
        ).toBeDefined();
      });

      it("should fail to update the password with the 422 Unauthorized Status Code", async () => {
        const oldPassword = "invalidpassword";
        const newPassword = "newpassword";
        const confirmPassword = "newpassword";
        const updateUserDto: UpdateUserDto = {
          oldPassword,
          newPassword,
          confirmPassword,
        };

        await request(testingApp.httpServer)
          .patch("/users/me")
          .set({
            Authorization: `Bearer ${accessToken}`,
          })
          .send(updateUserDto)
          .expect(422);
      });
    });
  });
});
