import { expect, test } from "@playwright/test";

test("choosing an album from the catalogue opens its making page", async ({
	page,
}) => {
	await page.goto("/");

	const home = page.getByRole("heading", { name: "Elige un álbum" });
	await expect(home).toBeVisible();

	const cards = page.getByRole("button", {
		name: /Cuadrado clásico|Retrato de bolsillo|Paisaje grande/,
	});
	await expect(cards).toHaveCount(3);

	await page.getByRole("button", { name: /Cuadrado clásico/ }).click();

	const making = page.getByRole("heading", { name: "Cuadrado clásico" });
	await expect(making).toBeVisible();
	await expect(page).toHaveURL(/\/confeccion$/);
});
