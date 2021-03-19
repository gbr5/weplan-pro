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

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  box-sizing: border-box;

  animation: ${appearFromTop} 1s;

  @media (max-width: 1000px) {
    overflow-x: scroll;
  }
`;

export const FirstRow = styled.div`
  display: flex;
  /* flex-direction */
  width: 100%;
  height: 100%;
  padding: 0 0 0 50px;

  @media (max-width: 1000px) {
    overflow-x: scroll;
    flex-direction: column;

    align-items: center;
  }
`;
export const SecondRow = styled.div`
  display: flex;
  /* flex-direction */
  width: 100%;
  height: 100%;
  padding: 0 0 0 50px;

  @media (max-width: 1000px) {
    overflow-x: scroll;
    flex-direction: column;

    align-items: center;

    gap: 1rem;

    padding-bottom: 1rem;
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

export const ArrowButton = styled.button`
  position: fixed;
  top: 6rem;
  left: 16px;
  z-index: 15;
  background: transparent;
  border: none;
  color: var(--letter-color-5);
`;
