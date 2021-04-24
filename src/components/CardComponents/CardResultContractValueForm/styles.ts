import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  width: 100%;
  height: 70vh;
  background: var(--letter-color-1);
  padding: 1rem;
  margin-top: 4rem;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;

  > strong {
    text-align: center;
    margin: 1rem auto;
    width: 100%;
    font-size: 1.2rem;
  }
`;
