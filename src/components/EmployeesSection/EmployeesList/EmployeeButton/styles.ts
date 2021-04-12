import styled, { css } from 'styled-components';

interface IProps {
  isNotActive: boolean;
}

export const Container = styled.button<IProps>`
  text-align: left;
  width: 100%;
  font-size: 1.3rem;
  border: none;
  background: var(--toast-success-background-color);
  padding: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: stretch;
  margin-left: 0.8rem;

  &:hover {
    background: var(--toast-info-background-color);
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
  }

  > strong {
    margin-right: auto;
  }

  > svg {
    margin-left: auto;
  }

  ${props =>
    props.isNotActive &&
    css`
      background: var(--toast-error-background-color);
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
    `}
`;
