import { ReactNode, AnchorHTMLAttributes } from "react";
import styled from "styled-components";
import Link from "next/link";

import { GREEN } from "@src/constants/palette";

type TagProps = {
  children: ReactNode;
  count?: number;
  /** @default true */
  clickable?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Tag({
  children,
  count,
  clickable = true,
  href,
  ...props
}: TagProps) {
  const tagDefault = (
    <Wrapper {...props} clickable={clickable}>
      {children}
      {count != null && <Count>{count}</Count>}
    </Wrapper>
  );

  return href ? (
    <Link href={href} passHref>
      {tagDefault}
    </Link>
  ) : (
    tagDefault
  );
}

const Wrapper = styled.a<Pick<TagProps, "clickable">>`
  margin: 0 0.8rem 0.8rem 0;
  padding: 0.2rem 0.6rem;
  border-radius: 0.8rem;

  font-size: 1.2rem;
  color: ${GREEN};
  background-color: ${({ theme }) => theme.colors.scheme.$gray300};

  ${(p) =>
    p.clickable &&
    `
    cursor: pointer;
    &:hover {
      background-color: ${p.theme.colors.scheme.$gray400};
    }
  `}
`;

const Count = styled.span`
  margin-left: 0.4rem;

  color: ${({ theme }) => theme.colors.scheme.$gray100};
`;
