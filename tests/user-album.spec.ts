import { expect, test } from "@playwright/test";

test("the user album shows its faces one at a time and survives a reload", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("button", { name: /Retrato de bolsillo/ }).click();

	const position = page.getByRole("status", { name: "Posición" });
	await expect(position).toHaveText("1/20");

	await page.getByRole("button", { name: "Siguiente" }).click();
	await expect(position).toHaveText("2/20");

	await page.reload();
	await expect(position).toHaveText("1/20");

	const making = page.getByRole("heading", { name: "Retrato de bolsillo" });
	await expect(making).toBeVisible();
});
