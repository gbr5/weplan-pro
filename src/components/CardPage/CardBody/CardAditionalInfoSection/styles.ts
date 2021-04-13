import styled, { css } from 'styled-components';
import '../../../../styles/global';

export const MenuHeader = styled.div`
  display: flex;
  height: 5rem;
  max-width: 100vw;
  border-bottom: 1px solid var(--letter-color-4);
  padding: 0.8rem;
  margin-top: 0.7rem;

  @media (max-width: 1100px) {
    overflow-x: scroll;
  }
`;

interface IButtonProps {
  isActive: boolean;
}

export const MenuBooleanButton = styled.button<IButtonProps>`
  background: var(--letter-color-4);
  color: var(--letter-color-1);
  border: none;
  height: 100%;
  min-width: 8rem;
  border-radius: 8px;
  margin: 0 0.5rem;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.2rem;

  &:hover {
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.35);
  }

  ${props =>
    props.isActive &&
    css`
      background: var(--header-primary);
      font-weight: 500;
      color: var(--letter-color-5);
      &:hover {
        opacity: 0.8;
        background: var(--header-primary);
      }
    `}
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  gap: 5px;
  padding: 5px;
`;
