import styled from 'styled-components';
import '../../../../../../styles/global';

export const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  padding: 4px;
  gap: 8px;

  background: var(--background-color);
  box-shadow: var(--box-shadow);
`;

export const Item = styled.button`
  margin: 0 auto;
  display: flex;
  justify-content: stretch;
  align-items: center;
  border: none;
  background: var(--card-color);
  width: 100%;
  text-align: left;
  padding: 2px;
  padding-left: 5px;
  border-radius: 4px;
  border: 1px solid var(--secondary-color);
  color: var(--letter-color-5);
  box-shadow: var(--box-shadow);
  font-size: 20px;

  transition: 0.6s;

  &:hover {
    background: var(--title-color);
    color: var(--letter-color-5);
    border: 1px solid var(--primary-color);
  }

  svg {
    margin-left: auto;
  }
`;
