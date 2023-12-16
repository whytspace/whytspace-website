const reverse = (str: string) => str.split("").reverse().join("");

/**
 * Takes a string and converts it to a bunch of data attributes.
 * Pass these attributes to an element to obfuscate the email address.
 */
export const obfuscate = (str: `${string}@${string}`) => {
  const [name, domain] = str.split("@");
  return {
    "data-eml": true,
    "data-eml-a": reverse(name),
    "data-eml-b": reverse(domain),
  };
};

/**
 * Takes a bunch of data attributes and converts them back to an email address.
 */
export const deobfuscate = (element: Element) => {
  const name = element.attributes.getNamedItem("data-eml-a")?.value;
  const domain = element.attributes.getNamedItem("data-eml-b")?.value;
  if (name && domain) {
    const email = `${reverse(name)}@${reverse(domain)}`;
    element.setAttribute("href", `mailto:${email}`);
  }
};
