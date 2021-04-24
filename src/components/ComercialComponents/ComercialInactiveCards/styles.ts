import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: block;
  width: 100%;
  height: 32rem;

  > span {
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

interface IButtonProps {
  isActive: boolean;
}

export const SuccessButton = styled.button<IButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem;

  background: transparent;
  border: none;
  font-size: 1.2rem;

  ${props =>
    !props.isActive &&
    css`
      margin: 1rem 0.5rem;
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
      background: var(--letter-color-2);
      border-radius: 4px;
    `}
  ${props =>
    props.isActive &&
    css`
      margin: 1rem 0.5rem 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--secondary-color);
      font-size: 1.3rem;
    `}
`;

export const CardsContainer = styled.div`
  display: block;
  padding: 0.5rem;
  border-radius: 8px;
  background: var(--background-color);
  width: 100%;
  height: 24rem;
  overflow-y: scroll;
`;

export const Card = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background: var(--letter-color-4);
  color: var(--secondary-color);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  border: none;
  width: 100%;
  border-radius: 4px;
  margin: 0.5rem auto;

  > strong {
    color: var(--letter-color-1);
  }

  &:hover {
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
  }
`;
