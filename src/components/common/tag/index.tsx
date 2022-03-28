import { ReactNode, AnchorHTMLAttributes } from "react";
import styled from "styled-components";

import { GREEN } from "@src/constants/palette";

type TagProps = {
  children: ReactNode;
  count?: number;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Tag({ children, count, ...props }: TagProps) {
  return (
    <Wrapper {...props}>
      {children}
      {count != null && <Count>{count}</Count>}
    </Wrapper>
  );
}

const Wrapper = styled.a`
  margin: 0 0.8rem 0.8rem 0;
  padding: 0.2rem 0.6rem;
  border-radius: 0.8rem;

  font-size: 1.2rem;
  color: ${GREEN};
  background-color: ${({ theme }) => theme.colors.scheme.$gray300};

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.scheme.$gray400};
  }
`;

const Count = styled.span`
  margin-left: 0.4rem;

  color: ${({ theme }) => theme.colors.scheme.$gray100};
`;
