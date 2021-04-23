import styled from 'styled-components';

export const BottomLine = styled.div`
  border-bottom: 2px solid var(--primary-color);
`;
export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 5px;
  box-sizing: border-box;
  border-radius: 5px;

  overflow-x: scroll;
`;
