import styled, { css } from 'styled-components';

interface IProps {
  isActive: boolean;
}

export const Container = styled.div<IProps>`
  display: flex;
  align-items: center;
  justify-content: stretch;
  padding: auto;
  padding: 0.5rem;
  background: var(--letter-color-4);
  border-radius: 4px;
  margin-top: 0.2rem;
  width: 95%;
  height: 48px;
  margin: 0.5rem auto;

  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);

  &:hover {
    box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.4);
  }

  > button {
    display: flex;
    margin-left: auto;
    padding: 0;
    background: transparent;
    border: none;
    text-align: left;

    &:first-child {
      width: 100%;
    }

    &:last-child {
      text-align: center;
      min-width: 2.5rem;
      color: var(--title-color);
    }
    > h3 {
      color: var(--letter-color-1);

      font-size: 1rem;
      margin-right: auto;
    }

    > p {
      font-size: 11px;
      color: var(--letter-color-5);
    }
    > strong {
      font-weight: 500;
      font-size: 1.2rem;
      color: var(--secondary-color);
      margin-left: auto;
    }
  }

  ${props =>
    props.isActive &&
    css`
      background: var(--header-primary);
      color: var(--header-background-color);

      > button {
        > strong {
          color: var(--primary-color);
        }

        &:last-child {
          color: var(--letter-color-5);
        }
        > h3 {
          color: var(--letter-color-5);
        }
      }
    `}
`;
