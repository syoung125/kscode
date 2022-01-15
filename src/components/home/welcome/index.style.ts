import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  position: absolute;
  top: 20vh;
  left: 0;
  right: 0;

  margin: 0 1rem;

  text-align: center;
  font-size: 3.2rem;
  font-weight: 700;
  white-space: break-spaces;
  line-height: 1.3;

  text-shadow: #007fd440 0.3rem 0.3rem;
`;

export default {
  Wrapper,
  Title,
};
