/**
 * PRETTIER formatting options
 * adjust default prettier settings
 *
 * @link https://prettier.io/docs/en/configuration.html
 * @link https://prettier.io/docs/en/options.html
 *
 * @type {import('prettier').Config}
 */
export default {
  /**
   * load plugins manually
   * @note the automatic plugin search does not work with pnpm anyway
   */
  plugins: [
    /**
     * automatically sort imports
     */
    "@trivago/prettier-plugin-sort-imports",
    /**
     * automatic class sorting for tailwindcss
     * @link https://tailwindcss.com/blog/automatic-class-sorting-with-prettier
     */
    "prettier-plugin-tailwindcss",

    "prettier-plugin-astro",
  ],

  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
