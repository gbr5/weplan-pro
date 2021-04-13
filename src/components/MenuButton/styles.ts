import styled from 'styled-components';
import '../../styles/global';

export const Button = styled.button`
  position: fixed;
  bottom: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: none;

  z-index: 1999;

  background: var(--secondary-color);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
  transition: 0.25s;

  &:hover {
    opacity: 0.8;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.5);
  }
`;
