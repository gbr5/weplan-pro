import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  margin: 4rem auto 2rem;
  background: var(--background-color);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  > h2 {
    text-align: center;
    width: 90%;
    margin: 1rem auto 2rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--secondary-color);
  }

  > button {
    max-width: 24rem;
    margin: 0.5rem auto;
  }
`;
