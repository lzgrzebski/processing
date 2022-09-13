import { expect, test } from './fixtures';

test('make sure camera works', async ({ page, mediaActions }) => {
    await page.goto('./');
    await mediaActions.waitForActiveStream('video');
});

test('make sure we can apply filter', async ({ page, mediaActions }) => {
    await page.goto('./');
    await mediaActions.waitForActiveStream('video');

    await page.locator('text="red"').check();

    await expect(
        page.locator('role=checkbox[name="red"][checked]')
    ).toBeChecked();

    await mediaActions.waitForActiveStream('video');
});
