import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  margin-top: 5rem;
  height: 100%;
  width: 100%;
  padding: 0 1rem;

  > span {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
    margin: 0 auto;

    > h1 {
      width: 100%;
      margin: 1rem auto 0.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--secondary-color);
      font-size: 1.5rem;
    }

    > button {
      position: absolute;
      top: 1rem;
      right: 0rem;
      z-index: 2;
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
  display: block;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;

  overflow-y: scroll;
  height: 68vh;
  padding: 0.5rem;
  width: 100%;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

export const FormSection = styled.div`
  display: flex;
`;

interface IFormProps {
  backgroundColor: string;
  textColor: string;
}

export const ButtonForm = styled.button<IFormProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #ff9900;
  border: none;
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1.4rem;
  transition: 0.3s;
  text-transform: capitalize;
  margin-top: 1rem;
  border-radius: 8px;

  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${shade(0.3, '#ff9900')};
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
