import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 5px 2px 5px;
  background: var(--background-color);
  width: 19.485%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  box-sizing: border-box;
  border: 0.5px solid var(--card-color);

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 5px;
    font-size: 16px;
    border-bottom: 0.2px solid var(--letter-color-4);
    width: 100%;
    strong {
      color: var(--letter-color-4);
      display: flex;
      align-items: center;
      justify-content: center;

      &:first-child {
        margin-right: auto;
        svg {
          color: var(--red-color);
        }
      }
      &:nth-child(2) {
        margin-left: auto;
      }
    }
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 240px;
  width: 100%;
  overflow-y: scroll;
`;

interface ICardProps {
  isActive: boolean;
}

export const Card = styled.div<ICardProps>`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  padding: auto;
  padding-right: 0;
  background: var(--card-color);
  border-radius: 2px;
  gap: 5px;

  width: 100%;
  height: 48px;

  button {
    display: flex;
    gap: 5px;

    h3 {
      color: var(--letter-color-5);
      font-size: 12px;
      margin-right: auto;
    }

    p {
      font-size: 11px;
      color: var(--letter-color-5);
    }
    strong {
      font-weight: 500;
      font-size: 12px;
      color: var(--letter-color-5);
    }
  }

  button {
    margin-left: auto;
    padding: 0;
    background: transparent;
    border: none;
  }

  ${props =>
    props.isActive &&
    css`
      background: var(--header-primary);
      color: var(--header-background-color);
      border: 1px solid var(--letter-color-5);
    `}
`;
