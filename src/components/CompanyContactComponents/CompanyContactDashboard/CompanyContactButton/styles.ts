import styled, { css } from 'styled-components';

interface IBooleanProps {
  isActive: boolean;
  isNew: boolean;
}

export const Container = styled.div<IBooleanProps>`
  display: flex;
  width: 100%;
  height: 32px;
  color: var(--letter-color-5);
  background: #ddd;
  margin-top: 1rem;
  border-radius: 4px;

  > button {
    background: transparent;
    border: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem;
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

  ${props =>
    props.isNew &&
    css`
      background: var(--secondary-color);

      button {
        color: var(--letter-color-5);
      }
    `}
`;
