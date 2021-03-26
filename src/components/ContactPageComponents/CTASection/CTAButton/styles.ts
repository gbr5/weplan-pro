import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 100%;
`;

interface IProps {
  color: string;
  backgroundColor: string;
}

export const ButtonExample = styled.button<IProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;

  background: ${props => props.backgroundColor};
  color: ${props => props.color};
  border: none;

  width: 100%;
  height: 3rem;
  border-radius: 4px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${props => shade(0.2, `${props.backgroundColor}`)};
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  }
`;
