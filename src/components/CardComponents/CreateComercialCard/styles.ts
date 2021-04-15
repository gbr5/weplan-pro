import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  margin: 3rem auto 2rem;
  border-radius: 8px;
  background: var(--background-color);
  padding: 1rem;
  height: 80%;
  width: 100%;

  > h2 {
    width: 90%;
    text-align: center;
    margin: 0rem auto 1rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid var(--secondary-color);
  }
`;
