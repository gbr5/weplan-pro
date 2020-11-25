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

  z-index: 1999;

  background: var(--primary-color);
  box-shadow: var(--box-shadow);
  transition: 0.25s;

  &:hover {
    opacity: 0.8;
    box-shadow: 1px 1px 10px 1px var(--title-color);
  }
`;
