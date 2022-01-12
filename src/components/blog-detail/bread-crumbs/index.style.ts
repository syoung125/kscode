import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  min-height: 2rem;

  padding: 0 1.6rem;
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
