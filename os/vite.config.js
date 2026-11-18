import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import { createReadStream, existsSync, statSync } from "fs";

const root = dirname(fileURLToPath(import.meta.url));
// The GitHub Pages site root: the built app is written here, next to the
// pages it links to (/Profile/p/, /Profile/timeline/, /Profile/assets/, data.json …).
const site = resolve(root, "..");
const src = (p) => resolve(root, "src", p);
const BASE = "/Profile/";
const BASE_PREFIX = "/Profile";

// In dev, serve the site's own static files (screenshots, data.json, the
// generated /p/ and /timeline/ pages) under /Profile/... so links and images
// behave identically to GitHub Pages production.
const serveSiteRoot = () => ({
  name: "serve-site-root",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      let path = decodeURIComponent((req.url ?? "/").split("?")[0]);
      if (path.startsWith(`${BASE_PREFIX}/`)) path = path.slice(BASE_PREFIX.length);
      if (!/^\/(assets|p|timeline)\/|^\/[\w.-]+\.(json|png|webp|txt|xml|pdf)$/.test(path)) {
        return next();
      }
      let file = join(site, path);
      if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
      if (!existsSync(file)) return next();
      createReadStream(file).pipe(res);
    });
  },
});

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss(), serveSiteRoot()],
  resolve: {
    alias: {
      "#components": src("components"),
      "#constants": src("constants"),
      "#store": src("store"),
      "#hoc": src("hoc"),
      "#windows": src("windows"),
      "#site": site,
    },
  },
  build: {
    outDir: site,
    // The site root holds hand-made and generated pages: never wipe it.
    emptyOutDir: false,
    // /assets/ already holds the project screenshots; keep bundles apart.
    assetsDir: "static",
    rollupOptions: {
      // The Persian page is its own HTML entry so /Profile/fa/ has Persian meta tags.
      input: {
        main: resolve(root, "index.html"),
        fa: resolve(root, "fa/index.html"),
      },
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          gsap: ["gsap", "@gsap/react"],
        },
      },
    },
  },
});
