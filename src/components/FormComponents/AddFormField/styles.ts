import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 8px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  padding: 1rem;

  > aside {
    position: relative;

    > button {
      position: absolute;
      top: 8px;
      right: 8px;
      background: transparent;
      border: none;

      color: var(--red-color);
    }
  }

  > section {
    display: flex;
    flex-direction: column;
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: stretch;
    width: 100%;

    > button {
      background: transparent;
      border: none;
      width: 10rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
