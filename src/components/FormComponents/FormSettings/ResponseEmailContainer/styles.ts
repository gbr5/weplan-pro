import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  text-align: center;

  h2 {
    width: 100%;
    text-align: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--secondary-color);
  }
`;
