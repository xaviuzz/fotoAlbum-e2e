import { expect, test } from "@playwright/test";

test("choosing an album from the catalogue opens its making page", async ({
	page,
}) => {
	await page.goto("/");

	const home = page.getByRole("heading", { name: "Elige un álbum" });
	await expect(home).toBeVisible();

	const cards = page.getByRole("link", {
		name: /Cuadrado clásico|Retrato de bolsillo|Paisaje grande/,
	});
	await expect(cards).toHaveCount(3);

	await page.getByRole("link", { name: /Cuadrado clásico/ }).click();

	const making = page.getByRole("heading", { name: "Cuadrado clásico" });
	await expect(making).toBeVisible();

	const reference = page.getByText("SQ-210");
	await expect(reference).toBeVisible();

	const back = page.getByRole("link", { name: "Volver al catálogo" });
	await expect(back).toBeVisible();
});
