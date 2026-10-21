import path from "node:path";
import { expect, test } from "@playwright/test";

const fixture = (name: string) =>
	path.join(import.meta.dirname, "fixtures", name);

test("a photo dragged onto the slot leaves the tray, survives a reload and returns when dragged back", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("button", { name: /Retrato de bolsillo/ }).click();

	const tray = page.getByRole("complementary", { name: "Mis fotos" });
	await tray
		.getByLabel("Fotos a subir")
		.setInputFiles([fixture("red.jpg"), fixture("blue.png")]);

	const thumbnails = tray.getByRole("img", { name: /Foto/ });
	await expect(thumbnails).toHaveCount(2);

	const slot = page.getByRole("figure", { name: "Hueco de la cara 1" });
	await thumbnails.first().dragTo(slot);
	await expect(thumbnails).toHaveCount(1);
	await expect(slot.getByRole("img")).toBeVisible();

	await page.reload();
	await expect(thumbnails).toHaveCount(1);
	await expect(slot.getByRole("img")).toBeVisible();

	await slot.getByRole("img").dragTo(tray);
	await expect(thumbnails).toHaveCount(2);
	await expect(slot.getByRole("img")).toHaveCount(0);
});
