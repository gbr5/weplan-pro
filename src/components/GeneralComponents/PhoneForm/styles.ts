import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > span {
    display: flex;
    align-items: center;
    justify-content: stretch;
    width: 100%;

    > div {
      margin: auto;
      &:nth-child(2) {
        margin: auto 1rem;
      }
    }
  }
`;
