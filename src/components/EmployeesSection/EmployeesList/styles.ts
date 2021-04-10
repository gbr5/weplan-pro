import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

interface IProps {
  isNotActive: boolean;
}

export const Employee = styled.div<IProps>`
  display: flex;
  margin: 1rem auto;
  width: 100%;
  align-items: center;
  justify-content: center;
  > p {
    font-weight: 600;
    width: 24px;
    font-size: 1.2rem;
  }

  > button {
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
  }
`;
