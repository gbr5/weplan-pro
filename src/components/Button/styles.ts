import styled from 'styled-components';
import '../../styles/global';

import { shade } from 'polished';

export const Container = styled.button`
  background: var(--secondary-color);
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: var(--letter-color-5);
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: ${shade(0.2, '#ff9000')};
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
  }
`;
