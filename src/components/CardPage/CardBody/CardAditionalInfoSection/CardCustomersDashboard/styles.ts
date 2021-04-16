import styled from 'styled-components';
import '../../../../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* box-sizing: border-box; */
  max-width: 100vw;
  text-align: center;
  overflow-y: scroll;

  h2 {
    width: 100%;
    margin: 0 auto;
  }
`;

export const CustomerContainer = styled.div`
  display: block;
  height: 25rem;
  overflow-y: scroll;
  width: 100%;
  padding: 0.5rem;
`;
