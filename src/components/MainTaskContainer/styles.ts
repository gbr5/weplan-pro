import styled from 'styled-components';
import '../../styles/global';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 332px;
  padding-bottom: 1rem;

  > h2 {
    width: 90%;
    margin: 1.5rem auto 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--secondary-color);
    text-align: center;
  }

  @media (max-width: 700px) {
    height: 32rem;
    padding-bottom: 0;
  }
`;

export const Container = styled.div`
  width: 96%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  /* background: var(--background-color); */
  border-radius: 8px;
  /* box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3); */
  padding: 8px auto;
  overflow-y: scroll;
`;
