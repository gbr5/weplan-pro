import styled from 'styled-components';
import '../../../../styles/global';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-color);
  border-radius: 8px;
  padding: 8px;
  gap: 32px;

  h2 {
    color: var(--letter-color);
  }

  div {
    background: var(--card-color);
    button {
      background: transparent;
      border: none;
    }
  }
`;

export const StatusButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  gap: 16px;
  padding: 5px;

  img {
    height: 40px;
    width: 40px;
  }
`;
