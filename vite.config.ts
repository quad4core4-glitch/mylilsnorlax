// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only, off on Vercel),
//     nitro/vite on Vercel only (see isVercel below),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

import { nitro } from "nitro/vite";

// Vercel: TanStack Start needs Nitro output (.output). The Lovable preset otherwise builds a
// Cloudflare Worker (dist/server + asset-only dist/client), which Vercel cannot serve → 404.
// Cloudflare deploys still use the default Cloudflare plugin when VERCEL is unset.
const isVercel = process.env.VERCEL === "1";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  cloudflare: isVercel ? false : undefined,
  tanstackStart: {
    server: { entry: "server" },
  },
  plugins: isVercel ? [nitro()] : [],
});
