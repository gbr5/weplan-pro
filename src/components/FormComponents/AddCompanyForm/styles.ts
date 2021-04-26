import styled from 'styled-components';

export const Container = styled.div`
  margin: 3rem auto 1rem;
  display: flex;
  flex-direction: column;

  background: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
  padding: 1rem;
  max-width: 700px;

  > section {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 700px;
    margin: 1rem auto;

    > strong {
      font-size: 1.2rem;
      margin: 0 auto 0.8rem;
    }
    > p {
      margin: 0 auto 0.5rem;
      line-height: 1.8rem;
    }

    > button {
      background: transparent;
      border: none;
      color: var(--secondary-color);

      &:hover {
        color: var(--title-color);
      }
    }
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;

    > button {
      background: transparent;
      border: none;
      color: var(--secondary-color);
      width: 200px;

      &:hover {
        color: var(--title-color);
      }
    }
  }
`;
