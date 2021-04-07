import styled from 'styled-components';
import '../../../styles/global';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 15fr;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  margin: 0.2rem 0;

  > button {
    position: absolute;
    top: 4px;
    right: 4px;
    background: transparent;
    border: none;
  }

  > div {
    display: flex;
    width: 100%;
    height: 100%;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
`;
