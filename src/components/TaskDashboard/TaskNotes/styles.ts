import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  margin-top: 4rem;
  background: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 75vh;
`;

export const TaskNotesContainer = styled.div`
  display: block;
  width: 100%;
  height: 62vh;
  margin-top: 0.2rem;
  overflow-y: scroll;
`;
