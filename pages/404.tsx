import Link from "next/link";
import styled from "styled-components";

export default function NotFoundPage() {
  return (
    <Wrapper>
      <Title>404 Not Found</Title>
      <Link href="/">Go to homepage</Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 10rem 1.6rem;

  > a {
    margin-top: 0.8rem;
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  text-shadow: #007fd440 0.3rem 0.3rem;
`;
