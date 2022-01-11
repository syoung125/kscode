import Waves from "./waves";

import Style from "./index.style";

export default function Welcome() {
  return (
    <Style.Wrapper>
      <Style.Title>{`Welcome to\nSeoyoung's\nTech Blog`}</Style.Title>
      <Style.WaveWrapper>
        <Waves />
      </Style.WaveWrapper>
    </Style.Wrapper>
  );
}
