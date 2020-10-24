import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  form {
    display: flex;
    width: 100%;
    height: 24px;
    gap: 8px;
    align-items: center;
    justify-content: center;

    input {
      color: black;
    }

    button {
      background: var(--primary-color);
      width: 150px;
      height: 24px;
      font-size: 16px;
      font-weight: 500;
      color: black;
      border: none;
      border-radius: 8px;

      &:hover {
        opacity: 0.8;
      }
    }
    button + button {
      background: var(--red-color);
    }
  }
`;
