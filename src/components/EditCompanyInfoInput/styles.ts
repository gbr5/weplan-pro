import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 32px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
  padding: 0;

  button {
    background: var(--primary-color);
    height: 40px;
    font-size: 32px;
    color: var(--letter-color-5);

    &:hover {
      opacity: 0.8;
    }
  }
  button + button {
    background: var(--red-color);
  }
`;
