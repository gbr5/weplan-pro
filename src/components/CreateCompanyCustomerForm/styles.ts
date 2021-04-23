import styled, { css } from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  height: 100%;
  padding: 8px;

  background: var(--card-color);
  box-shadow: var(--box-shadow);

  input {
    height: 64px;
    padding-left: 8px;
    border: 0.8px solid var(--letter-color-5);
    border-radius: 4px;
    color: var(--header-background-color);
    font-weight: 500;
    font-size: 24px;
    transition: 0.5s;
    box-shadow: var(--window-box-shadow);
    ::-webkit-input-placeholder {
      color: var(--letter-color-3);
    }
    &:hover {
      box-shadow: var(--box-shadow);
      color: var(--letter-color-1);
      background: var(--letter-color-2);
      ::-webkit-input-placeholder {
        color: var(--title-color);
      }
    }
  }

  button {
    height: 64px;
    background: var(--header-primary);
    border: 0.8px solid var(--title-color);
    border-radius: 4px;
    color: var(--header-background-color);
    font-weight: 500;
    font-size: 24px;
    box-shadow: var(--box-shadow);
    transition: 0.5s;

    &:hover {
      color: var(--header-primary);
      background: var(--header-background-color);
      box-shadow: var(--window-box-shadow);
    }
  }
`;

export const ContactTypeContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

interface IContactTypeButtonProps {
  isActive: boolean;
}

export const ContactTypeButton = styled.button<IContactTypeButtonProps>`
  background: var(--header-background-color);
  color: var(--header-primary);
  box-shadow: var(--box-shadow);
  transition: 0.3s;
  width: 100%;
  height: 40px;

  &:hover {
    background: var(--header-primary);
    color: var(--header-background-color);
    box-shadow: var(--window-box-shadow);
  }

  ${props =>
    props.isActive &&
    css`
      background: var(--header-primary);
      color: var(--header-background-color);
      box-shadow: var(--window-box-shadow);
      transition: 0.3s;
      &:hover {
        background: var(--header-background-color);
        color: var(--header-primary);
        box-shadow: var(--box-shadow);
      }
    `}
`;
