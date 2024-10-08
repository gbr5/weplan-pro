import styled from 'styled-components';
import { shade } from 'polished';
import IOnlyFormStylesDTO from '../../../dtos/IOnlyFormStylesDTO';

interface IFormProps {
  formStyles: IOnlyFormStylesDTO;
}

export const Container = styled.div`
  display: block;
  align-items: center;
  justify-content: stretch;
  margin: 3rem auto 1rem;

  padding-bottom: 1rem;

  width: 100%;
  max-width: 700px;
  /* height: 100%; */

  /* overflow-y: scroll; */
`;

export const FirstButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  > a,
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: var(--letter-color-5);
    border: none;
    font-size: 1.3rem;
    background: var(--secondary-color);
    width: 100%;
    border-radius: 4px;
    height: 2rem;
    transition: 0.3s;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.15);
    &:hover {
      background: ${shade(0.2, `#ff9900`)};
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.25);
    }
    &:first-child {
      margin-right: 0.5rem;
    }
    &:last-child {
      margin-left: 0.5rem;
    }
  }
`;

export const UrlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 2px;
  padding: 5px;

  box-shadow: 0 0 4px 3px rgba(150, 150, 150, 0.2);
  width: 100%;
  max-width: 600px;
  margin: 1rem auto;

  > strong {
    border-bottom: 1px solid var(--secondary-color);
    width: 5rem;
    font-size: 1.3rem;
    text-align: center;
  }

  a {
    color: var(--title-color);
    font-size: 1rem;
  }
`;

export const FormContainer = styled.div<IFormProps>`
  display: block;
  text-align: center;
  justify-content: flex-start;
  margin: 1rem auto;
  padding: 2rem 0;

  background: ${props => props.formStyles.background_color};
  color: ${props => props.formStyles.text_color};
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 70vh;
  /* min-height: 600px; */
  max-width: 600px;

  border-radius: 4px;

  overflow-y: scroll;

  > h1 {
    text-transform: capitalize;
    color: ${props => props.formStyles.text_color};
    margin-bottom: 1rem;
  }
  > p {
    color: ${props => props.formStyles.text_color};
    margin-bottom: 1rem;
  }
`;

export const FakeFieldSection = styled.div`
  display: block;
  width: 100%;
  margin: 1rem auto;

  padding: 0 2rem 2rem;

  @media (max-width: 800px) {
    padding: 0 1rem;
  }
`;

export const AddField = styled.button`
  border-radius: 50%;
  height: 3rem;
  width: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  background: var(--secondary-color);

  transition: 0.3s;

  margin: 3rem auto;

  &:hover {
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
    background: ${shade(0.2, `#ff9900`)};
  }
`;

export const FakeField = styled.div<IFormProps>`
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  height: 100%;
  background: ${props => props.formStyles.background_color};

  border: 2px solid var(--input-container-color);
  color: var(--letter-color-5);
  box-shadow: var(--box-shadow);

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  margin: 1rem auto;

  position: relative;

  > strong {
    color: ${props => props.formStyles.text_color};
    margin: 0.5rem auto;
  }

  > button {
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: none;
    margin: 0.5rem auto;

    color: var(--red-color);
  }
`;

export const FakeInput = styled.div`
  background: var(--input-container-color);
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid var(--input-container-color);
  color: var(--letter-color-5);
  box-shadow: var(--box-shadow);

  display: flex;
  align-items: center;
`;

export const FakeButton = styled.button<IFormProps>`
  background: ${props => props.formStyles.button_color};
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  margin: 1 2rem;

  border: 2px solid var(--input-container-color);
  color: ${props => props.formStyles.button_text_color};
  box-shadow: var(--box-shadow);

  display: flex;
  align-items: center;
  justify-content: center;
`;
