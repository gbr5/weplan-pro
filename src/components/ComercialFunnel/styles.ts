import styled, { keyframes } from 'styled-components';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    /* transform: translateY(-500px); */
    z-index: 0;
  }
  10% {
    opacity: 0.001;
    /* transform: translateY(-4px); */
    z-index: 0;
  }
  25% {
    opacity: 0.005;
    /* transform: translateY(-4px); */
    z-index: 0;
  }
  50% {
    opacity: 0.008;
    /* transform: translateY(-4px); */
    z-index: 0;
  }
  60% {
    opacity: 0.01;
    /* transform: translateY(-4px); */
    z-index: 0;
  }
  70% {
    opacity: 0.02;
    /* transform: translateY(-4px); */
    z-index: 0;
  }
  80% {
    opacity: 0.04;
    /* transform: translateY(-4px); */
    z-index: 0;
  }
  85% {
    opacity: 0.1;
    /* transform: translateY(-3px); */
    z-index: 1;
  }
  90% {
    opacity: 0.2;
    /* transform: translateY(-2px); */
    z-index: 2;
  }
  95% {
    opacity: 0.4;
    /* transform: translateY(-1px); */
    z-index: 2;
  }
  98% {
    opacity: 0.8;
    /* transform: translateY(0px); */
    z-index: 2;
  }
  100% {
    opacity: 1;
    /* transform: translateY(0px); */
    z-index: 2;
  }
`;

const lineAppearFromTop = keyframes`
  0% {
    transform: translateY(-400px);
    z-index: 2;
  }
  80% {
    transform: translateY(-4px);
    z-index: 2;
  }
  85% {
    transform: translateY(-3px);
    z-index: 2;
  }
  90% {
    transform: translateY(-2px);
    z-index: 2;
  }
  95% {
    transform: translateY(-1px);
    z-index: 2;
  }
  98% {
    z-index: 2;
    transform: translateY(0px);
    z-index: 2;
  }
  100% {
    transform: translateY(0px);
    z-index: 2;
  }
`;

export const BottomLine = styled.div`
  border-bottom: 2px solid var(--primary-color);
  animation: ${lineAppearFromTop} 1s;
`;
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  padding: 8px;
  background: var(--card-color);
  height: 400px;
  box-sizing: border-box;
  animation: ${appearFromTop} 1s;
`;
