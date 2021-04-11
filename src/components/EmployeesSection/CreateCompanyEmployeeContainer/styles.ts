import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  height: 100%;
  padding: 1rem;
  padding-top: 3rem;
  overflow-y: scroll;

  background: var(--background-color);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
  border-radius: 8px;

  z-index: 12;
  position: fixed;
  top: 20%;
  left: 20%;
  height: 60%;
  width: 60%;

  @media (max-width: 700px) {
    top: 5%;
    left: 5%;
    height: 90%;
    width: 90%;
  }

  > header {
    width: 100%;

    > button {
      position: absolute;
      top: 8px;
      right: 8px;
      background: transparent;
      border: none;
      color: var(--red-color);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  > h1 {
    font-size: 24px;
    width: 90%;
    margin: 1rem auto 1.5rem;
    border-bottom: 1px solid var(--secondary-color);
    text-align: center;
    padding-bottom: 0.5rem;
  }
`;
