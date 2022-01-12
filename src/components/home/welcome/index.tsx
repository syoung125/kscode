import Waves from "./waves";

import Style from "./index.style";

export default function Welcome() {
  return (
    <Style.Wrapper>
      <Style.Title>{`Welcome to\nSeoyoung's Tech Blog`}</Style.Title>
      <Style.WaveWrapper>
        <Waves />
      </Style.WaveWrapper>
    </Style.Wrapper>
  );
}
