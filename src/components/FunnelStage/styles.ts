import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 2px 5px;
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
  height: 320px;
  width: 100%;
`;

export const Card = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  padding: 5px;
  padding-right: 0;
  background: var(--card-color);
  border-radius: 2px;

  width: 100%;
  height: 40px;
  div {
    h3 {
      color: var(--letter-color-5);
      font-size: 15px;
    }

    p {
      font-size: 13px;
      color: var(--letter-color-5);
    }
    strong {
      font-weight: 500;
      font-size: 13px;
      color: var(--letter-color-5);
    }
  }

  button {
    margin-left: auto;
    padding: 0;
    background: transparent;
    border: none;
  }
`;
