import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  padding: 3rem 0.5rem 2rem;
  background: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;

  > section {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 1rem;

    > h2 {
      margin-right: 1rem;
    }

    > button {
      margin-left: 1rem;
      border: none;
      background: var(--secondary-color);
      padding: 0.5rem;
      border-radius: 8px;
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
    }
  }

  > input {
    padding: 0.5rem;
    width: 100%;
    border-radius: 8px;
    color: #010101;
    margin: 1rem 0;
  }
`;

export const ContactsContainer = styled.div`
  display: block;
  width: 100%;
  height: 45vh;
  overflow-y: scroll;
  padding: 0.5rem;
  padding-bottom: 2rem;
`;

interface IButtonProps {
  isActive: boolean;
}

export const ContactMenuButton = styled.button<IButtonProps>`
  height: 2.5rem;
  width: 8rem;
  margin: 0.5rem;
  background: var(--letter-color-4);
  color: var(--letter-color-1);
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  transition: 0.3s;

  ${props =>
    props.isActive &&
    css`
      color: var(--letter-color-5);
      background: var(--secondary-color);
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
    `}
`;

export const ContactButton = styled.button<IButtonProps>`
  width: 100%;
  height: 2.5rem;
  margin: 0.5rem auto;
  background: var(--letter-color-4);
  color: var(--letter-color-1);
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  transition: 0.3s;

  ${props =>
    props.isActive &&
    css`
      color: var(--letter-color-5);
      background: var(--secondary-color);
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
    `}
`;
