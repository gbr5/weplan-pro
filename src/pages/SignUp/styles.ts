import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import '../../styles/global';

import signUpBackgroundImg from '../../assets/sign-up-background.jpeg';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 40px 40px 0;
  @media (max-width: 800px) {
    padding: 40px 0 0 24px;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: transparent;

  place-content: center;

  width: 100%;

  @media (max-width: 800px) {
    display: flex;
  }
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
      font-size: 3vh;
      padding: auto 0;
    }
    h2 {
      color: var(--letter-color-1);
      font-size: 2.5vh;
      padding: auto 0;
    }
    h3 {
      padding: 2px 0;
      color: var(--letter-color-4);
      font-size: 2.6vh;
    }
  }

  h1 {
    color: var(--primary-color);
    font-size: 8vh;
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
    margin-top: 24px;

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

  @media (max-width: 800px) {
    width: 90%;
    margin-bottom: 24px;

    h1 {
      color: var(--primary-color);
      font-size: 40px;
      font-weight: bold;
      padding: 16px 16px;
      background: var(--background-color);
      border-radius: 8px;
      width: 60%;
      text-align: center;
    }

    div {
      &:first-child {
        display: none;
        /* text-align: center;
        width: 60%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--header-background-color);
        border-radius: 8px;
      }
      h1,
      h3 {
        padding: 0;
        font-size: 24px;
        font-weight: bold;
        color: var(--title-color);
        background: var(--header-background-color);
      }
      h1 {
        padding-top: 24px; */
      }
      h2 {
        display: none;
      }
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
