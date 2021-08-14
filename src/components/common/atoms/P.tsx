import { PropsWithChildren } from "react";
import styled, { useTheme, css } from "styled-components";

const PSizes = ["xsmall", "small", "medium", "large", "xlarge"] as const;
export type PSize = typeof PSizes[number];
export const size2Rem = (size: PSize = "medium"): string =>
  ({
    xsmall: "0.7rem",
    small: "0.8rem",
    medium: "1rem",
    large: "1.4rem",
    xlarge: "1.8rem",
  }[size]);

const PWeights = ["regular", "bold"] as const;
export type PWeight = typeof PWeights[number];
export const weight2Number = (weight: PWeight = "regular"): number =>
  ({ regular: 400, bold: 600 }[weight]);

export type PProps = PropsWithChildren<{
  size?: PSize;
  weight?: PWeight;
  color?: string;
  /** 생략부호 사용 여부. width도 반드시 명시해야합니다. */
  ellipsis?: boolean;
  /** 공백을 그래도 표시하는가 */
  preWrap?: boolean;
  /** 표시될 줄 수. height도 반드시 명시해야합니다. */
  numOfLines?: number;
}>;

function P(props: PProps) {
  const { colors } = useTheme();
  const propsWithDefault: PProps = {
    size: "medium" as const,
    weight: "regular" as const,
    color: colors.$white,
    ellipsis: false,
    preWrap: false,
    numOfLines: 1,
    ...props,
  };
  return <StyledP {...propsWithDefault} />;
}

export default P;

const StyledP = styled.p<PProps>`
  padding: 0;
  margin: 0;
  letter-spacing: -0.5px;
  word-break: break-all;

  font-size: ${({ size }) => size2Rem(size)};
  font-weight: ${({ weight }) => weight2Number(weight)};
  font-color: ${({ color }) => color};

  ${({ ellipsis }) =>
    ellipsis ? `text-overflow: ellipsis; overflow: hidden;` : ""}
  ${({ preWrap }) =>
    preWrap ? `white-space: pre-wrap;word-break: keep-all;` : ""}
    ${({ numOfLines }) =>
    numOfLines && numOfLines > 1 ? multiLineStyle(numOfLines) : ""}
`;

const multiLineStyle = (num: number) => css`
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${num};
`;
