import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  padding: 5px;
  border-radius: 5px;
  margin: 0.5rem 0;
  width: 100%;
  max-width: 94vw;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  margin: 3rem auto 1rem;
  background: var(--background-color);

  > h2 {
    margin: 1rem auto;
  }

  > div {
    margin: 1rem autoauto;
  }
`;
