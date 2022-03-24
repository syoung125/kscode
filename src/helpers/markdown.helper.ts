import marked from "marked";
import prism from "prismjs";

import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-yaml";

marked.setOptions({
  highlight: (code, lang) => {
    if (prism.languages[lang]) {
      return prism.highlight(code, prism.languages[lang], lang);
    } else {
      return code;
    }
  },
});

export const parseMarkdown = (text: string): string => {
  return marked.parse(text);
};
