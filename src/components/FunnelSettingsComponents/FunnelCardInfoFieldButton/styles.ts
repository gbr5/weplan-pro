import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 700px;
  margin: 1rem auto;
  height: 100%;
  padding: 1rem;

  aside {
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

  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: stretch;
    width: 100%;

    button {
      background: transparent;
      border: none;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
