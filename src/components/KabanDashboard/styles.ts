import styled, { keyframes } from 'styled-components';
import '../../styles/global';

const appearFromTop = keyframes`
  0% {
    height: 10%;
    opacity: 0;
  }
  50% {
    opacity: 0.01;
  }
  100% {
    opacity: 1;
  }
`;

const lineAppearFromTop = keyframes`
  0% {
    transform: translateY(-300px);
  }
  70% {
    transform: translateY(-4px);
  }
  80% {
    transform: translateY(-3px);
  }
  85% {
    transform: translateY(-2px);
  }
  90% {
    transform: translateY(-1px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export const FunnelTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin: 5rem 0 1rem;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--header-background-color);
  gap: 5px;
  padding: 5px;

  animation: ${appearFromTop} 1s;

  > button {
    position: absolute;
    top: 4px;
    right: 4px;
    background: transparent;
    border: none;
  }

  > div {
    display: flex;
    width: 100%;
    height: 100%;
  }
`;

export const BottomLine = styled.div`
  border-bottom: 2px solid var(--header-primary);
  animation: ${lineAppearFromTop} 1s;
  z-index: 2;
`;
export const UpperLine = styled.div`
  border-bottom: 1px solid var(--header-primary);
  z-index: 2;
`;
