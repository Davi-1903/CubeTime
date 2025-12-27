import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
        open: true,
        proxy: {
            '/api': 'http://localhost:5000',
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-helmet-async', 'react-router-dom', 'tailwindcss'],
                    ui: ['@tabler/icons-react'],
                },
            },
        },
    },
});
