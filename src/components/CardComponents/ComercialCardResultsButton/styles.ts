import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 6rem;
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
  background: rgba(250, 40, 10, 0.5);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  width: 8rem;
  border-radius: 5px;
  margin: 0.3rem 0.5rem 0 0;
`;
export const SuccessButton = styled.button`
  margin: 0.3rem 0.5rem 0 0;
  background: rgba(150, 250, 10, 0.5);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  width: 8rem;
  border-radius: 5px;
`;
export const FinishButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary-color);

  > strong {
    color: var(--letter-color-5);
  }
`;
