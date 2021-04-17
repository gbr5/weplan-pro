import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  /* flex-direction: column; */
  position: relative;

  overflow-y: scroll;
  width: 100%;
  padding: 0.5rem;

  border-radius: 8px;
  background: #c9c9c9;

  > span {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    button {
      background: transparent;
      border: none;
      color: var(--red-color);
    }
  }

  > h2 {
    margin: 1.5rem auto 1rem;
  }
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

export const FormContainer = styled.div`
  display: flex;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5rem auto;

  > strong {
    margin-bottom: 0.5rem;
  }
`;
