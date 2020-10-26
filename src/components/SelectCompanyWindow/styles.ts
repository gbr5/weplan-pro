import styled, { css, keyframes } from 'styled-components';
import '../../styles/global';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  gap: 16px;

  animation: ${appearFromTop} 0.5s;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    gap: 16px;
    width: 100%;
  }
`;
