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
  box-shadow: var(--window-box-shadow);

  top: 44px;
  left: 0;
  width: 50px;
  height: 100%;

  animation: ${appearFromLeft} 1s;

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

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

export const MainDashboardImageButton = styled.button`
  background: transparent;
  border: none;

  > img {
    max-width: 50px;
    max-height: 44px;
    margin: auto 0;
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
`;
