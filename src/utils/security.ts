const reverse = (str: string) => str.split("").reverse().join("");

export const ATTRIBUTE = "data-obf";

export const tryCatch = <D>(
  fn: () => D,
): { data: D | undefined; error: Error | undefined } => {
  try {
    return { data: fn(), error: undefined };
  } catch (error) {
    return { data: undefined, error: error as Error };
  }
};

/**
 * Takes a list of attributes and obfuscates them
 * @example
 * <a {obfuscate({ href: "mailto:mail@example.com" })}>Email me</a>
 * Use the key "__content" to obfuscate the inner text.
 *
 * obfuscation happens on 3 levels:
 * - JSON.stringify
 * - base 64 encoding
 * - reversing the string
 */
export const obfuscate = (attributes: Record<string | "__content", string>) => {
  return {
    [ATTRIBUTE]: reverse(
      Buffer.from(JSON.stringify(attributes), "utf-8").toString("base64"),
    ),
  };
};

/**
 * Extracts the obfuscated content from an element and applies it
 * @example
 * <a data-obf="...">Email me</a>
 * <script>
 *  document.querySelectorAll("[data-obf]").forEach(deobfuscate);
 * </script>
 */
export const deobfuscate = (element: Element) => {
  const { data } = tryCatch<Record<string | "__content", string>>(() => {
    const values = element.attributes.getNamedItem(ATTRIBUTE)?.value || "";
    return JSON.parse(window.atob(reverse(values)));
  });

  if (!data) return;
  Object.entries(data).forEach(([key, value]) => {
    if (key === "__content") {
      element.textContent = value;
    } else {
      element.setAttribute(key, value);
    }
  });
};
