import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  background: var(--letter-color-1);
  height: 100vh;
  width: 100vw;
  flex: 1;
  padding: 1rem;
  box-sizing: border-box;
  background-size: 100%;
`;

export const WePlanButtons = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 100%;

    border: 1px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);

    border-radius: 5px;

    transition: 0.3s;

    text-decoration: none;
    color: #010101;
    &:hover {
      box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.15);
    }

    &:first-child {
      margin-right: 0.5rem;
      background: var(--secondary-color);
    }
    &:last-child {
      margin-left: 0.5rem;
      background: var(--title-color);
    }
  }

  > button:first-child {
    background: var(--secondary-color);

    &:hover {
      background: var(--title-color);
    }
  }
  > button:last-child {
    background: var(--green);
    &:hover {
      background: var(--primary-color);
    }
  }
`;

interface IFormStyleProps {
  background: string;
  text: string;
  buttonBackground: string;
  buttonText: string;
}

export const FormContainer = styled.div<IFormStyleProps>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  height: 100%;
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  margin: auto 0;

  background: ${props => props.background};
  color: ${props => props.text};

  overflow-y: scroll;

  > h1 {
    margin: 0.6rem 0;
    font-size: 1.5rem;
    text-align: center;
  }
  > p {
    margin: 0.6rem 0;
    font-size: 1.1rem;
    text-align: center;
  }

  > button {
    background: ${props => props.buttonBackground};
    color: ${props => props.buttonText};
  }
`;

export const InputField = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;

  > strong {
    margin-bottom: 0.8rem;
  }
`;
