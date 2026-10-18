import { expect, test } from "@playwright/test";

test("the chosen album survives a reload and starting over returns to the catalogue", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("link", { name: /Retrato de bolsillo/ }).click();

	const making = page.getByRole("heading", { name: "Retrato de bolsillo" });
	await expect(making).toBeVisible();

	await page.reload();
	await expect(making).toBeVisible();

	await page.goto("/");
	await expect(making).toBeVisible();

	await page.getByRole("button", { name: "Sesión anónima" }).click();
	await page.getByRole("menuitem", { name: "Volver a empezar" }).click();
	await page.getByRole("button", { name: "Confirmar" }).click();

	const home = page.getByRole("heading", { name: "Elige un álbum" });
	await expect(home).toBeVisible();

	const cards = page.getByRole("link", {
		name: /Cuadrado clásico|Retrato de bolsillo|Paisaje grande/,
	});
	await expect(cards).toHaveCount(3);
});
