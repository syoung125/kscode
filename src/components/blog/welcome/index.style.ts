import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
  height: 100%;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3.2rem;
  font-weight: 700;
  white-space: break-spaces;
  line-height: 1.3;

  text-shadow: #007fd440 0.3rem 0.3rem;

  position: absolute;
  top: 20%;
  left: 0px;
  right: 0px;

  margin: 0 1.6rem;

  z-index: 1;
`;

const WaveWrapper = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 40%;
`;

export default {
  Wrapper,
  Title,
  WaveWrapper,
};
