import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  width: 100%;
  margin-top: 3rem;
  border-radius: 8px;
  background: var(--background-color);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  padding: 1rem 0.8rem;

  min-height: 11rem;

  > h2 {
    width: 90%;
    margin: 1rem auto 2rem;
    border-bottom: 1px solid var(--secondary-color);
    padding-bottom: 0.5rem;
    text-align: center;
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem auto;
    width: 100%;
    height: 100%;

    > button {
      background: transparent;
      border: 1px solid var(--letter-color-4);
      padding: 1rem;
      margin: auto 1rem;
      transition: 0.3s;
      border-radius: 8px;
      background: var(--letter-color-3);

      &:hover {
        border: 2px solid var(--secondary-color);
        border-radius: 4px;
      }
    }
  }
`;
