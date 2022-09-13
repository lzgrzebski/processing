import { test as base } from '@playwright/test';
import { Page } from '@playwright/test';

const createMediaActions = (page: Page) => ({
    async waitForActiveStream(selector: string) {
        const videoHandle = await page.waitForSelector(selector);
        return page.waitForFunction(
            ([node]) =>
                Boolean(
                    ((node as HTMLVideoElement)?.srcObject as MediaStream)
                        ?.active
                ),
            [videoHandle]
        );
    },
});

type MediaActions = ReturnType<typeof createMediaActions>;

export const test = base.extend<{
    mediaActions: MediaActions;
}>({
    mediaActions: async ({ page }, use) => {
        await use(createMediaActions(page));
    },
});

export const { expect, beforeEach, afterEach } = test;
