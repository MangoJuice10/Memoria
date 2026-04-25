import {test, expect} from "@playwright/test";

test("user can login successfully", async ({page}) => {
    await page.goto("/login");

    await page.getByTestId("email").fill("user@example.com");
    await page.getByTestId("password").fill("password");

    await page.getByTestId("submit").click();

    await expect(page).toHaveURL("/");
});