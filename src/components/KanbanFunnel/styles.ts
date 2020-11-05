import styled from 'styled-components';

export const BottomLine = styled.div`
  border-bottom: 2px solid var(--primary-color);
`;
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  padding: 5px;
  /* background: var(--card-color); */
  box-sizing: border-box;
  border-radius: 5px;
`;
