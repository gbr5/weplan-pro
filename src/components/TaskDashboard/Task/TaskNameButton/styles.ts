import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TaskNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  > button {
    background: transparent;
    border: none;
    font-size: 1.2rem;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    margin: 0.5rem 0;
  }
`;
