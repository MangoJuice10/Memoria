import {test, expect} from "@playwright/test";

test("settings can login successfully", async ({page}) => {
    await page.goto("/login");

    await page.getByTestId("email").fill("settings@example.com");
    await page.getByTestId("password").fill("password");

    await page.getByTestId("submit").click();

    await expect(page).toHaveURL("/");
});