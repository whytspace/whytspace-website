import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [
    //
    icon(),
  ],
  server: {
    host: true, // needed by .devcontainer
  },
  /**
   * Never inline scripts for to get rid of the 'unsafe-inline' CSP.
   * Styles are never inlined by astro anyway
   *
   * @link https://github.com/withastro/roadmap/discussions/377#discussioncomment-8918763
   */
  vite: {
    build: { assetsInlineLimit: 0 },
    plugins: [tailwindcss()],
  },
});
