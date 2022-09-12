import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/processing/',
    css: {
        postcss: {
            plugins: [autoprefixer],
        },
    },
    plugins: [react()],
});
