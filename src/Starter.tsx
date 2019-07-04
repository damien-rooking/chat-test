import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Starter: React.FC<IProps> = () => {
  return (
    <StyledContainer>
      <StyledImage src="https://d223inzzioa7u0.cloudfront.net/src/img/profile.svg" />
      <StyledContent>株式会社ルーキングお問い合わせありがとうございます。</StyledContent>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StyledImage = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  border: 1px solid #e8e8e8;
  vertical-align: top;
  max-width: 100%;
`;

const StyledContent = styled.div`
  color: #595a5a;
  padding: 3px 10px;
  position: relative;
  margin-left: 8px;
  line-height: 1.5;
  letter-spacing: 1px;
  text-align: left;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 8px;
  font-size: 12px;
`;
export default Starter;
