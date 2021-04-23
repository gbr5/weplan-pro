import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';
import '../../styles/global';

import signInBackgroundImg from '../../assets/lotus_flower-by-Daniel_Holtzhouse.jpeg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-80px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > img {
    height: 3rem;
  }
`;

interface IToggleProps {
  signin: boolean;
}

export const ToggleButton = styled.span<IToggleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 8px;
  left: 8px;

  > button {
    background: transparent;
    border: none;

    > h3 {
      font-size: 20px;
      font-weight: 500px;
      color: var(--title-color);

      ${props =>
        props.signin &&
        css`
          font-size: 20px;
          font-weight: 500px;
          color: var(--letter-color-3);
          transition: 0.5s;
          &:hover {
            color: var(--primary-color);
          }
        `}
    }
    > h2 {
      font-size: 20px;
      font-weight: 500px;
      color: var(--letter-color-3);
      transition: 0.5s;
      &:hover {
        color: var(--primary-color);
      }
      ${props =>
        props.signin &&
        css`
          font-size: 20px;
          font-weight: 500px;
          color: var(--title-color);
        `}
    }
  }

  > h3 {
    font-size: 20px;
    font-weight: 500px;
    color: var(--title-color);
  }

  > a {
    background: transparent;
    border: none;
    text-decoration: none;

    h2 {
      font-size: 20px;
      font-weight: 500px;
      color: var(--letter-color-3);
      transition: 0.5s;
      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  animation: ${appearFromLeft} 0.5s;
  h1 {
    color: var(--primary-color);
    font-size: 3rem;
  }
  form {
    margin: 1rem 0;
    width: 340px;
    text-align: center;
    h1 {
      color: var(--title-color);
      margin-bottom: 24px;
      font-size: 2rem;
    }
    a {
      color: var(--letter-color-5);
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.15s;
      border-radius: 4px;
      background: rgba(255, 105, 1, 0.4);
      box-shadow: var(--window-box-shadow);
      &:hover {
        /* color: ${shade(0.2, '#f4ede8')}; */
        color: var(--title-color);
        background: rgba(10, 10, 10, 0.4);
        box-shadow: var(--box-shadow);
      }
    }
  }
  > a {
    color: var(--primary-color);
    font-weight: 500;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.15s;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--secondary-color);
    border-radius: 4px;
    height: 3rem;
    width: 100%;
    padding: 0 1rem;

    svg {
      margin-right: auto;
    }

    p {
      margin: auto;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
      background: var(--primary-color);
    }
  }
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: auto;
  z-index: -1;
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
