import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-top: 3rem;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 730px) {
    grid-template-columns: repeat(2, 1fr);
  }

  height: 100%;
  width: 100%;
  margin: 2rem auto;
`;

export const IconContainer = styled.button`
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  height: 10rem;
  width: 10rem;
  margin: 1rem auto;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.div`
  display: flex;
  height: 8rem;
  width: 8rem;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(100, 100, 100, 0.8);
  border-radius: 8px;
  margin-bottom: 1rem;
  background: var(--letter-color-4);
  color: var(--letter-color-1);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.35);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.4);
  }
  /* > svg {
    border: 1px solid rgba(155, 155, 155, 0.8);
    padding: 8px;
    border-radius: 8px;
  } */
`;
