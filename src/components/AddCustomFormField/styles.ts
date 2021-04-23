import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

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

export const ButtonContainer = styled.div`
  display: flex;
`;
