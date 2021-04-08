import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--header-background-color);
  margin-top: 4rem;
  position: relative;
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  top: 2rem;
  left: 0;
  z-index: 2;
`;
