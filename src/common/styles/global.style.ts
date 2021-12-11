import { createGlobalStyle } from "styled-components";

import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  }
  body {
    font-size: 1rem;
    width: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input {
    -webkit-appearance: none;
    -webkit-border-radius: 0;
  }
  ul, li {
    margin: 0;
    padding: 0;
    list-style-type: none; 
  }
  *,
  ::after,
  ::before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
