import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  border: 1px solid var(--title-color);
  padding: 5px;
  border-radius: 5px;
  margin: 0.5rem auto;
  width: 100%;
  max-width: 90vw;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  }

  > h3 {
    font-size: 1.2rem;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    margin: 0.5rem 0;
  }

  > div {
    display: flex;
    width: 100%;

    > span {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const ButtonContainer = styled.strong`
  display: flex;
  margin-left: auto;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 2rem;
    max-height: 2rem;
    margin: 0.5rem;
    border-radius: 5px;
    border: none;
    transition: 0.3s;
  }
`;

export const Status = styled.button`
  margin: 0 auto;
  padding: 0;
  background: transparent;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
  }

  > img,
  svg {
    max-height: 2rem;
    max-width: 50px;
    &:hover {
      border: 1px solid var(--title-color);
    }
  }
`;

export const Priority = styled.button`
  margin: 0 auto;
  padding: 0;
  background: var(--letter-color-4);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
  }
  > svg,
  img {
    max-height: 2rem;
    max-width: 2rem;
    &:hover {
      border: 1px solid var(--title-color);
    }
  }
`;

export const SettingsButton = styled.button`
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1.5rem;

  > div {
    width: 0.3rem;
    height: 0.3rem;
    margin: 0.2rem auto;
    border-radius: 50%;
    background: var(--letter-color-5);
  }
`;
