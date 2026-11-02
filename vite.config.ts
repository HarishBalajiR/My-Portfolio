import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    // Performance optimizations
    target: "esnext",
    minify: "terser",
    cssMinify: true,
    reportCompressedSize: true,
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
      },
    },
    rollupOptions: {
      output: {
        // Manual chunking for better caching
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "radix-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-slot",
          ],
          "query-vendor": ["@tanstack/react-query"],
          "carousel": ["embla-carousel-react"],
        },
        // Optimize asset filenames for better caching
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 600,
  },
}));
