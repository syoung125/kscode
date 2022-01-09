import { css } from "styled-components";

import { BLUE, GRAY_400, PINK } from "@src/common/constants/palette";

export const postContentsStyles = css`
  line-height: 1.7;
  font-size: 1.1rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;

    font-weight: 700;
    line-height: 1.5;
  }
  h1 {
    font-size: 2.2rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.8rem;
  }
  h4 {
    font-size: 1.6rem;
  }
  h5 {
    font-size: 1.4rem;
  }
  h6 {
    font-size: 1.3rem;
  }

  img {
    max-width: 100%;
  }

  a {
    color: ${BLUE};
  }

  p {
    margin: 1rem 0;
  }

  strong,
  b {
    font-weight: bold;
  }

  ul,
  ol {
    padding-left: 2.4rem;
  }

  ul > li {
    list-style-type: disc;
  }

  ol > li {
    list-style-type: decimal;
  }

  hr {
    margin: 2rem 0;
  }

  td,
  th {
    border: 1px solid ${({ theme }) => theme.colors.scheme.$gray100};
    padding: 0.8rem;
  }

  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.scheme.$gray400};
  }

  th {
    padding-top: 1rem;
    padding-bottom: 1rem;

    text-align: center;

    background-color: ${({ theme }) => theme.colors.scheme.$gray200};
    color: ${({ theme }) => theme.colors.scheme.$white};
  }

  p code {
    margin: 0 0.2rem;
    padding: 0.1rem 0.2rem;
    border-radius: 0.2rem;

    background-color: ${({ theme }) => theme.colors.scheme.$gray300};
    color: ${PINK};
  }

  pre[class*="language-"] {
    background-color: ${GRAY_400};

    margin: 1rem 0;
    border-radius: 0.8rem;

    overflow-x: auto;
  }

  blockquote {
    display: flex;

    padding: 1em;
    margin: 2rem 0;
    border-left: 0.4rem solid ${({ theme }) => theme.colors.scheme.$gray300};

    background-color: ${({ theme }) => theme.colors.scheme.$gray500};

    white-space: pre-wrap;

    > p {
      margin: 0;
    }
  }
`;
