import styled, { keyframes } from 'styled-components';
import '../../styles/global';

const appearFromLeft = keyframes`
  0% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(0px);
  }
`;

export const Container = styled.aside`
  position: fixed;
  z-index: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--header-background-color);
  gap: 16px;
  box-shadow: var(--window-box-shadow);

  top: 44px;
  left: 0;
  width: 50px;
  height: 100%;

  animation: ${appearFromLeft} 1s;

  > img {
    max-width: 50px;
    max-height: 44px;
    margin: auto 0;
  }

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    gap: 32px;

    button {
      background: transparent;
      border: none;

      &:first-child {
        svg {
          color: var(--title-color);
        }
      }

      svg {
        color: var(--background-color);
        height: 40px;
        width: 40px;
      }
    }
  }
`;

export const Button = styled.button`
  background: transparent;
  border: none;

  img {
    /* width: 40px; */
    height: 48px;
  }
`;

export const ArrowButton = styled.button`
  background: transparent;
  border: none;

  svg {
    color: var(--background-color);
  }


  /* position: fixed;
  z-index: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--header-background-color);
  gap: 16px;
  box-shadow: var(--window-box-shadow);
  padding: 32px;

  top: 60px;
  left: 0;

  animation: ${appearFromLeft} 1s; */

`;
