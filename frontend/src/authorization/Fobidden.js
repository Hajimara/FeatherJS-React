import React from "react";
import styled from "styled-components";
import Error from '../lib/style/Error.png'

const Area = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 1100px;
  min-height: 800px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const AreaWrapper = styled.div`
width: 1100px;
    margin: 0 auto;
`;

const ForbiddenTitle = styled.div``;
const Forbidden = styled.h1``;
const Fobidden = () => {
  return (
    <Area>
      <AreaWrapper>
        <ForbiddenTitle>
        <img src={Error}></img>
          <Forbidden>403 Forbidden</Forbidden>
          <p>권한이 없는 사용자는 접근이 불가능합니다.</p>
          <a href={'/'}>메인페이지로 돌아가기</a>
        </ForbiddenTitle>
      </AreaWrapper>
    </Area>
  );
};

export default Fobidden;