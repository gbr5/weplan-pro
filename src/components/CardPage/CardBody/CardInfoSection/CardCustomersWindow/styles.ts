import styled, { css } from 'styled-components';
import '../../../../../styles/global';

export const Customer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

interface IStatusButtonProps {
  isActive: boolean;
}

export const BooleanButton = styled.button<IStatusButtonProps>`
  background: var(--letter-color-2);
  border-radius: 5px;
  border: none;
  opacity: 0.9;
  transition: 0.3s;
  padding: 5px;
  font-size: 16px;
  color: var(--letter-color-5);
  width: 100%;

  &:hover {
    box-shadow: var(--window-box-shadow);
    background: var(--title-color);
    opacity: 1;
    border: 1px solid var(--header-primary);
  }

  ${props =>
    props.isActive &&
    css`
      color: var(--header-background-color);
      background-color: var(--header-primary);
      opacity: 1;
      transition: 0.25s;
      border: 1px solid var(--title-color);

      &:hover {
        opacity: 0.8;
        border: 1px solid var(--title-color);
        box-shadow: var(--window-box-shadow);
        background: var(--letter-color-2);
      }
    `}
`;

export const RemoveCustomerButton = styled.button<IStatusButtonProps>`
  background: var(--letter-color-2);
  border-radius: 5px;
  border: 1px solid var(--header-primary);
  opacity: 0.8;
  transition: 0.3s;
  padding: 5px;
  color: var(--red-color);
  margin: auto;

  &:hover {
    box-shadow: var(--window-box-shadow);
    opacity: 1;
    background-color: var(--title-color);
  }

  ${props =>
    props.isActive &&
    css`
      background: var(--title-color);
      color: var(--red-color);
      opacity: 1;
      transition: 0.25s;
      border: 1px solid var(--title-color);
      padding: 7px;

      &:hover {
        opacity: 0.5;
        border: 1px solid var(--title-color);
      }
    `}
`;

export const AddCustomerButton = styled.button`
  background: var(--title-color);
  border: var(--header-primary);
  width: 100%;
  height: 40px;
  margin-bottom: 40px;

  &:hover {
    opacity: 0.8;
    box-shadow: var(--window-box-shadow);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  background: var(--header-background-color);
  border-radius: 8px;
  padding: 8px;
  /* margin-left: 80px; */
  gap: 5px;
  overflow-y: scroll;
`;
