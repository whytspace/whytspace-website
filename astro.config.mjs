import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],

  /**
   * Never inline scripts for to get rid of the 'unsafe-inline' CSP.
   * Styles are never inlined by astro anyway
   *
   * @link https://github.com/withastro/roadmap/discussions/377#discussioncomment-8918763
   */
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
