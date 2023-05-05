import { ReactNode, AnchorHTMLAttributes } from "react";
import styled, { ThemedStyledProps } from "styled-components";
import Link from "next/link";

import { GREEN } from "@src/constants/palette";

type TagProps = {
  children: ReactNode;
  count?: number;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Tag({
  children,
  count,
  href,
  ...anchorProps
}: TagProps) {
  const contents = (
    <>
      {children}
      {count != null && <Count>{count}</Count>}
    </>
  );

  return href ? (
    <LinkWrapper {...anchorProps} href={href}>
      {contents}
    </LinkWrapper>
  ) : (
    <Wrapper>{contents}</Wrapper>
  );
}

const wrapperStyles = (p: ThemedStyledProps<any, any>, clickable: boolean) => `
margin: 0 0.8rem 0.8rem 0;
padding: 0.2rem 0.6rem;
border-radius: 0.8rem;

font-size: 1.2rem;
color: ${GREEN};
background-color: ${p.theme.colors.scheme.$gray300};

${
  clickable &&
  `
  cursor: pointer;
  &:hover {
    background-color: ${p.theme.colors.scheme.$gray400};
  }
`
}
`;

const LinkWrapper = styled(Link)`
  ${(p) => wrapperStyles(p, true)}
`;

const Wrapper = styled.span`
  ${(p) => wrapperStyles(p, false)}
`;

const Count = styled.span`
  margin-left: 0.4rem;

  color: ${({ theme }) => theme.colors.scheme.$gray100};
`;
