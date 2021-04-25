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
    position: relative;
    background: transparent;
    border: none;
    font-size: 1.2rem;
    width: 100%;
    padding: 0.5rem auto 0.8rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    margin: 0.8rem 0;
    > svg {
      position: absolute;
      top: -0.8rem;
      right: 0.5rem;
      color: var(--red-color);
    }
  }
`;
