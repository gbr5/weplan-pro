import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  height: 100%;
  padding: 8px;
  padding-top: 3rem;
  overflow-y: scroll;

  background: var(--background-color);
  box-shadow: var(--box-shadow);

  > h1 {
    font-size: 24px;
    width: 90%;
    margin: 1rem auto 1.5rem;
    border-bottom: 1px solid var(--secondary-color);
    text-align: center;
    padding-bottom: 0.5rem;
  }
`;
