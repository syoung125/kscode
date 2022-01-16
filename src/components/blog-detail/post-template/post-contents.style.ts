import { css } from "styled-components";

import { PINK } from "@src/common/constants/palette";

export const postContentsStyles = css`
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