import styled from 'styled-components';
import '../../styles/global';

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 216px;

  gap: 5px;

  @media (max-width: 1100px) {
    flex-direction: column;
    height: 100%;
  }
`;
