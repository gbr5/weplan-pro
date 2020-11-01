import styled, { keyframes } from 'styled-components';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    /* transform: translateY(-5px); */
    z-index: -10;
    background: transparent;
  }
  80% {
    opacity: 0.4;
    /* transform: translateY(-4px); */
    background: transparent;
    z-index: -1;
  }
  90% {
    opacity: 0.8;
    /* transform: translateY(-2px); */
    z-index: 0;
  }
  100% {
    opacity: 1;
    z-index: 2;
    /* transform: translateY(0px); */
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 16px;
  background: var(--background-color);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  animation: ${appearFromTop} 1s;
`;
