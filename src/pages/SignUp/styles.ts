import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import '../../styles/global';

import signUpBackgroundImg from '../../assets/sign-up-background.jpeg';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 40px;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: transparent;

  place-content: center;

  width: 100%;
`;

const appearFromDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-480px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  place-content: center;
  gap: 16px;

  animation: ${appearFromDown} 0.5s;

  div {
    display: flex;
    justify-content: center;
    gap: 3vh;
    width: 100%;

    h1 {
      color: var(--title-color);
      font-size: 4vh;
      padding: auto 0;
    }
    h2 {
      color: var(--letter-color-1);
      font-size: 4vh;
      padding: auto 0;
    }
    h3 {
      padding: 2px 0;
      color: var(--letter-color-4);
      font-size: 3.5vh;
    }
  }

  h1 {
    color: var(--primary-color);
    font-size: 10vh;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    text-align: center;

    input {
      width: 340px;
    }

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: var(--letter-color-3);
      display: block;
      text-decoration: none;
      transition: color 0.15s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: var(--primary-color);
    display: block;
    text-decoration: none;
    transition: 0.3s;
    font-size: 3vh;
    font-weight: 500;

    display: flex;
    align-items: center;

    p {
      color: var(--letter-color-4);
      transition: 0.3s;
      &:hover {
        color: var(--title-color);
      }
    }

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: var(--title-color);
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
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;

export const QuestionTitle = styled.h2`
  color: var(--title-color);
  font-size: 32px;
  margin: 32px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  > strong {
    font-size: 40px;
    color: var(--primary-color);
  }
`;
