import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  margin-top: 2rem;
  padding-bottom: 2rem;

  width: 100%;
  height: 100%;

  overflow-y: scroll;

  gap: 1rem;
`;

export const FirstButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  gap: 1rem;

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
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  padding-top: 1rem;

  gap: 1rem;

  background: var(--background-color);
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  min-height: 600px;
  max-width: 600px;

  border-radius: 4px;

  overflow-y: scroll;

  h1 {
    text-transform: capitalize;
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
  gap: 1rem;

  strong {
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

export const FakeFieldSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

  margin: 2rem auto;

  &:hover {
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
    background: ${shade(0.2, `#ff9900`)};
  }
`;

export const FakeField = styled.div`
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  height: 100%;

  border: 2px solid var(--input-container-color);
  color: var(--letter-color-5);
  box-shadow: var(--box-shadow);

  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;
  justify-content: center;

  position: relative;

  > button {
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: none;

    color: var(--red-color);
  }
`;

export const FakeInput = styled.div`
  background: var(--input-container-color);
  border-radius: 10px;
  padding: 16px;
  width: 15rem;

  border: 2px solid var(--input-container-color);
  color: var(--letter-color-5);
  box-shadow: var(--box-shadow);

  display: flex;
  align-items: center;
`;
