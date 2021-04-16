import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  > strong {
    width: 100%;
    margin: 2rem auto;
    font-size: 1.25rem;
  }

  > button {
    margin: 2rem auto;
  }
`;
