import styled from "styled-components";

import { postContentsStyles } from "./PostContents.style";

const Wrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
`;

const Article = styled.article`
  padding: 2.4rem 1.6rem;
  margin: 0 auto;

  @media (min-width: 1000px) {
    max-width: 80%;
  }
`;

const Header = styled.header`
  padding-bottom: 1.2rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.scheme.$gray400};
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;

  letter-spacing: -0.004em;
  line-height: 1.5;

  white-space: break-spaces;

  margin-bottom: 1.6rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.img`
  width: 1.8rem;
  height: 1.8rem;

  border-radius: 50%;
`;

const Author = styled.b`
  font-size: 1.2rem;
  font-weight: 500;

  margin-left: 0.4rem;
`;

const Date = styled.p`
  font-size: 1.2rem;
  font-weight: 300;

  padding-left: 0.4rem;
  margin-left: 0.4rem;
  border-left: 1px solid ${({ theme }) => theme.colors.scheme.$gray100};
`;

const PostContents = styled.div`
  margin-top: 2rem;

  ${postContentsStyles}
`;

export default {
  Wrapper,
  Article,
  Header,
  Title,
  Row,
  Avatar,
  Author,
  Date,
  PostContents,
};
