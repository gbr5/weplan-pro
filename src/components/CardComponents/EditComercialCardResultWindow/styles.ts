import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -4rem;
  left: -10rem;
  width: 12rem;
  background: var(--letter-color-2);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  z-index: 15;

  > button {
    border: none;
    background: var(--secondary-color);
    width: 100%;
    padding: 0.5rem;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    font-size: 1.2rem;

    &:hover {
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.5);
    }

    &:first-child {
      margin-bottom: 0.5rem;
      background: rgba(12, 80, 150, 0.5);
    }

    &:last-child {
      margin-top: 0.5rem;
      /* background: rgba(12, 80, 150, 0.5); */
    }
  }
`;
