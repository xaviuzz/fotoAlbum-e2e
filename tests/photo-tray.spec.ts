import path from "node:path";
import { expect, test } from "@playwright/test";

const fixture = (name: string) =>
	path.join(import.meta.dirname, "fixtures", name);

test("uploaded photos stay in the tray after a reload and starting over empties it", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("button", { name: /Retrato de bolsillo/ }).click();

	const tray = page.getByRole("complementary", { name: "Mis fotos" });
	const empty = tray.getByText("Aún no hay fotos");
	await expect(empty).toBeVisible();

	await tray
		.getByLabel("Fotos a subir")
		.setInputFiles([fixture("red.jpg"), fixture("blue.png")]);

	const thumbnails = tray.getByRole("img", { name: /Foto/ });
	await expect(thumbnails).toHaveCount(2);
	await expect(thumbnails.first()).toHaveJSProperty("complete", true);
	await expect(thumbnails.nth(1)).toHaveJSProperty("complete", true);

	await page.reload();
	await expect(thumbnails).toHaveCount(2);
	await expect(thumbnails.first()).not.toHaveJSProperty("naturalWidth", 0);
	await expect(thumbnails.nth(1)).not.toHaveJSProperty("naturalWidth", 0);

	await page.getByRole("button", { name: "Sesión anónima" }).click();
	await page.getByRole("menuitem", { name: "Volver a empezar" }).click();
	await page.getByRole("button", { name: "Confirmar" }).click();

	await page.getByRole("button", { name: /Retrato de bolsillo/ }).click();
	await expect(empty).toBeVisible();
	await expect(thumbnails).toHaveCount(0);
});
