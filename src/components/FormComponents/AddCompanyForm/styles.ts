import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  background: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
  padding: 1rem;

  > section {
    display: flex;
    flex-direction: column;

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
