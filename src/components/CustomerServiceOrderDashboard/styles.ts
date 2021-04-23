import styled, { css } from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  box-sizing: border-box;

  > button {
    position: absolute;
    top: 4px;
    right: 4px;
    background: transparent;
    border: none;
  }
`;

export const FirstRow = styled.div`
  display: flex;
  /* flex-direction */
  width: 100%;
  height: 100%;
  padding: 0 0 0 50px;
`;

interface IButtonProps {
  isActive: boolean;
}

export const MenuButton = styled.button<IButtonProps>`
  background: transparent;
  border: none;

  ${props =>
    props.isActive &&
    css`
      color: var(--title-color);
      background: var(--header-background-color);
      opacity: 0.8;
      box-shadow: var(--window-box-shadow);
    `}
`;

export const ServiceOrderMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
`;

interface IBooleanProps {
  isActive: boolean;
}

export const ServiceOrder = styled.span<IBooleanProps>`
  display: flex;
  width: 100%;
  height: 32px;
  color: var(--letter-color-5);
  background: var(--card-background-color);

  button {
    background: transparent;
    border: none;
    width: 100%;

    display: flex;
    align-items: stretch;
    justify-content: center;
  }

  ${props =>
    props.isActive &&
    css`
      background: var(--header-background-color);
      opacity: 0.8;

      button {
        color: var(--title-color);
      }
    `}
`;
