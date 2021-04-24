import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 5.7rem;
  right: 0;
  z-index: 2;
  > button {
    border: none;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const LostButton = styled.button`
  background: transparent;
`;
export const SuccessButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const FinishButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary-color);
`;
