import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./', import.meta.url)),
        },
    },
    server: {
        host: true,
        port: 3000,
        open: false, // Disable auto-open to prevent issues in headless env
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                },
            },
        },
    },
});
