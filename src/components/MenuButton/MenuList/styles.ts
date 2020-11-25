import styled from 'styled-components';
import '../../../styles/global';

export const List = styled.div`
  position: fixed;
  bottom: 48px;
  right: 48px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  width: 184px;
  height: 220px;
  border-radius: 4px;
  padding: 4px;
  gap: 8px;
  z-index: 2000;

  background: var(--card-color);
  box-shadow: var(--box-shadow);
`;

export const Item = styled.button`
  margin: 0 auto;
  display: flex;
  justify-content: stretch;
  align-items: center;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  padding: 2px;
  padding-left: 5px;
  border-radius: 4px;
  background: var(--secondary-color);
  border: 1px solid var(--secondary-color);
  color: var(--primary-color);
  box-shadow: var(--box-shadow);

  transition: 0.25s;

  &:hover {
    opacity: 0.8;
    border: 1px solid var(--primary-color);
  }

  svg {
    margin-left: auto;
  }
`;
