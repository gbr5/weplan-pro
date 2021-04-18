import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  padding: 5px 2px 5px;
  background: var(--background-color);
  min-width: 19.375vw;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  box-sizing: border-box;
  border: 0.5px solid var(--card-color);

  @media (max-width: 1200px) {
    min-width: 350px;
  }

  > h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 16px;
    border-bottom: 0.2px solid var(--letter-color-4);
    width: 100%;
    margin: 0.2rem auto;
    > strong {
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
  display: block;
  height: 240px;
  width: 100%;
  overflow-y: scroll;
`;
