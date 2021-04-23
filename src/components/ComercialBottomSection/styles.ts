import styled from 'styled-components';
import '../../styles/global';

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 216px;
  margin: 1.5rem 0 2rem;

  @media (max-width: 1100px) {
    flex-direction: column;
    height: 100%;
  }
`;
