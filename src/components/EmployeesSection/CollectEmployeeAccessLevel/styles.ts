import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;

  > strong {
    margin: 2rem 0;
    font-size: 1.3rem;
  }

  > section {
    display: flex;
    align-items: center;
    justify-content: stretch;
    width: 100%;
    margin: 1rem 0;
  }
`;
