// Edge Runtime compatible HTML parser (replacement for cheerio)
// Uses DOMParser which is available in Edge Runtime

// Cheerio-like load function for Edge Runtime
export function load(html) {
  // Build-time or server-time without DOMParser
  if (typeof DOMParser === "undefined") {
    // Build-time fallback - return minimal API
    return function $() {
      return {
        html: () => html,
        text: () => html.replace(/<[^>]*>/g, ""),
        first: () => ({ html: () => "", remove: () => {}, text: () => "" }),
        each: () => {},
        attr: () => "",
        prop: () => "",
      };
    };
  }

  // Parse HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Return a cheerio-like function
  return function $(selector) {
    // No selector - return whole document
    if (!selector) {
      return {
        html: () => doc.body.innerHTML,
      };
    }

    // Get elements matching selector
    const elements = Array.from(doc.querySelectorAll(selector));

    return {
      // Get first element
      first: () => {
        const el = elements[0];
        return {
          html: () => el?.innerHTML || "",
          text: () => el?.textContent?.trim() || "",
          remove: () => {
            if (el) {
              el.remove();
            }
          },
        };
      },

      // Iterate over elements
      each: (callback) => {
        elements.forEach((el, index) => {
          // Wrap element with cheerio-like API
          const wrappedEl = {
            prop: (name) => {
              if (name === "tagName") {
                return el.tagName;
              }
              return el[name];
            },
            text: () => el.textContent?.trim() || "",
            attr: (name, value) => {
              if (value !== undefined) {
                el.setAttribute(name, value);
                return el;
              }
              return el.getAttribute(name) || "";
            },
          };
          callback(index, wrappedEl);
        });
      },

      // Get text content
      text: () => {
        if (elements.length === 0) return "";
        return elements[0].textContent?.trim() || "";
      },

      // Get/Set HTML - returns modified HTML
      html: () => {
        // Return the full modified document HTML
        return doc.body.innerHTML;
      },

      // Get/Set attribute
      attr: (name, value) => {
        if (elements.length === 0) return "";

        if (value !== undefined) {
          elements[0].setAttribute(name, value);
          return elements[0];
        }
        return elements[0].getAttribute(name) || "";
      },

      // Get property
      prop: (name) => {
        if (elements.length === 0) return "";
        if (name === "tagName") {
          return elements[0].tagName;
        }
        return elements[0][name] || "";
      },

      // Get length
      length: elements.length,
    };
  };
}
