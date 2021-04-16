import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  > strong {
    width: 100%;
    margin: 2rem auto 1.5rem;
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
`;
