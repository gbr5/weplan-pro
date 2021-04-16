import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  > strong {
    width: 100%;
    margin: 2rem auto;
    font-size: 1.25rem;
  }

  > button {
    margin: 2rem auto;
  }

  > span {
    position: absolute;
    top: 2rem;
    left: 1rem;
    > button {
      background: transparent;
      border: none;
    }
  }

  > section {
    display: flex;
    align-items: center;
    justify-content: stretch;

    > button:first-child() {
      margin-right: 0.5rem;
    }

    > button:last-child() {
      margin-left: 0.5rem;
    }
  }
`;
