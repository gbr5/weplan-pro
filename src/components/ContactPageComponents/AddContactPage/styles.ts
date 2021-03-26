import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;

  margin-top: 2rem;

  > h2 {
    font-size: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ff9900;
    margin-top: 1rem;
  }

  > section {
    margin-top: 1rem;
    width: 100%;

    > strong {
      font-size: 1.2rem;
      text-align: center;
      color: var(--letter-color-1);
      margin: 1rem 0;
    }

    > p {
      margin: 0.5rem 0;
      color: var(--letter-color-2);
    }
  }
`;
