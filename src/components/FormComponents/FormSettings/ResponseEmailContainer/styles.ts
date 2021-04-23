import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  text-align: center;

  h2 {
    width: 100%;
    text-align: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--secondary-color);
  }

  > p {
    margin-top: 0.5rem;
    line-height: 1.6rem;
    color: var(--letter-color-1);
    font-size: 1rem;
  }

  button {
    font-size: 1.4rem;
  }
`;
