import styled, { css } from 'styled-components';
import '../../../styles/global';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  margin: 1rem 0 2rem;

  > h2 {
    width: 90%;
    margin: 1.5rem auto 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--secondary-color);
    text-align: center;
  }
`;

export const StatusMenuButtonContainer = styled.strong`
  width: 100%;
  height: 100%;
  text-align: left;

  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IStatusButtonProps {
  isActive: boolean;
}

export const StatusMenuButton = styled.button<IStatusButtonProps>`
  margin: 24px auto;
  background: var(--title-color);
  border-radius: 5px;
  border: none;
  opacity: 0.6;
  transition: 0.3s;
  padding: 5px;
  font-size: 24px;
  color: var(--letter-color-5);

  min-height: 3rem;
  width: 100%;

  &:hover {
    opacity: 1;
    border: 1px solid var(--header-primary);
  }

  ${props =>
    props.isActive &&
    css`
      color: var(--letter-color-5);
      background-color: var(--header-primary);
      opacity: 1;
      transition: 0.25s;
      border: 1px solid var(--header-background-color);

      &:hover {
        opacity: 0.5;
        border: 1px solid var(--title-color);
      }
    `}
`;

export const Container = styled.div`
  width: 95%;
  height: 24rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  background: var(--background-color);
  border-radius: 8px;
  padding: 0.2rem;
  overflow-y: scroll;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  margin: 0.5rem auto;
`;

export const ButtonContainer = styled.strong`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  button:first-child {
    padding: 0;
    svg {
      padding: 0;
      background-color: var(--card-color);
      border-radius: 2px;
    }
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 350px;

    h3 {
      border-bottom: 1px solid var(--title-color);
    }
    p {
      font-weight: 500;
      font-size: 20px;
      color: var(--letter-color-3);
    }
  }
`;

export const Status = styled.button`
  margin: 0 auto;
  padding: 0;
  background: transparent;

  img {
    height: 50px;
    &:hover {
      border: 1px solid var(--title-color);
    }
  }
`;

export const Priority = styled.button`
  margin: 0 auto;
  padding: 0;

  svg {
    height: 50px;
    &:hover {
      border: 1px solid var(--title-color);
    }
  }
`;
