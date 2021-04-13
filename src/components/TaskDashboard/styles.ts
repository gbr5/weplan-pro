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

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 3rem;

  margin: 2rem 0 2rem;

  animation: ${appearFromTop} 1s;

  @media (max-width: 1000px) {
    overflow-x: scroll;
  }
`;

export const FirstRow = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-bottom: 2rem;

  @media (max-width: 1000px) {
    overflow-x: scroll;
    flex-direction: column;

    align-items: center;
  }
`;
