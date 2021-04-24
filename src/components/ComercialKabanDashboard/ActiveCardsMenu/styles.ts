import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto 0.5rem;
`;

interface IButtonProps {
  isActive: boolean;
}

export const ActiveButton = styled.button<IButtonProps>`
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
      background: var(--secondary-color);
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
