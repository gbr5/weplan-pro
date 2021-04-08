import styled from 'styled-components';
import '../../../styles/global';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 216px;

  @media (max-width: 1100px) {
    width: 100%;
  }

  > h2 {
    margin: 0.5rem auto;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  background: var(--header-background-color);
  border-radius: 8px;
  gap: 16px;
  padding: 8px;

  > div {
    display: flex;
    align-items: stretch;
    justify-content: stretch;

    > p {
      color: var(--letter-color-2);
      width: 150px;
      &:first-child {
        color: var(--header-primary);
      }
    }
  }
`;
