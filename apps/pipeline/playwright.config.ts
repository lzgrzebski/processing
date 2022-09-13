import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    projects: [
        {
            name: 'Chromium',
            use: {
                ...devices['Desktop Chrome'],
                browserName: 'chromium',
                launchOptions: {
                    args: [
                        '--use-fake-device-for-media-stream',
                        '--use-fake-ui-for-media-stream',
                        '--no-user-gesture-required',
                        '--disable-extensions',
                        '--disable-sync',
                        '--enable-automation',
                        '--no-default-browser-check',
                        '--disable-translate',
                    ],
                },
                permissions: [
                    'camera',
                    'microphone',
                    'clipboard-read',
                    'clipboard-write',
                ],
            },
        },
    ],
    use: {
        baseURL: 'http://localhost:5173',
    },
    webServer: {
        command: 'yarn dev',
        port: 5173,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
};

export default config;
