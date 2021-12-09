import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;

  padding: 0.6rem 1.6rem;
`;

const Path = styled.p`
  width: 60%;

  font-weight: 300;
  color: ${({ theme }) => theme.colors.scheme.$gray100};

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default {
  Wrapper,
  Path,
};
