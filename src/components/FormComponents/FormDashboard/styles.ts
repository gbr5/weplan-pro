import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 1rem;
  padding: 5rem 1rem 0;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    button {
      background: var(--secondary-color);
      border: 1px solid var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      color: var(--primary-color);
      box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.15);
      transition: 0.5s;

      &:hover {
        background: var(--title-color);
        box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
      }
    }
  }
`;

export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3 1fr);
  gap: 1rem;
  width: 100%;

  max-width: 25rem;
`;

export const FormSection = styled.div`
  display: flex;
`;

interface IFormProps {
  backgroundColor: string;
  textColor: string;
}

export const ButtonForm = styled.button<IFormProps>`
  background: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  border: none;
  width: 100%;
  height: 3rem;
  border-radius: 4px;
  font-size: 1.4rem;
  transition: 0.3s;
  text-transform: capitalize;

  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: ${props => shade(0.3, props.backgroundColor)};
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
