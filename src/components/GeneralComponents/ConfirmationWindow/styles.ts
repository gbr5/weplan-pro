import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: stretch;

  gap: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;

  button:first-child {
    background: var(--secondary-color);
    color: var(--primary-color);
  }
  button:last-child {
    background: var(--primary-color);
    color: var(--secondary-color);
  }
`;
