import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  padding: 5px;
  border-radius: 5px;
  margin: 0.5rem auto;
  width: 100%;
  width: 95vw;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.2);

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
    display: block;
    width: 100%;

    > span {
      display: flex;
      align-items: center;
      justify-content: center;

      > p {
        font-size: 0.95rem;
        &:first-child {
          margin-right: 0.5rem;
        }
        &:last-child {
          margin-left: 0.5rem;
        }
      }
    }
  }
`;

export const ButtonContainer = styled.strong`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
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
    height: 2rem;
    width: 50px;
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
    height: 2rem;
    width: 2rem;
    &:hover {
      border: 1px solid var(--title-color);
    }
  }
`;

export const DeleteButton = styled.button`
  margin: 0 auto;
  background: var(--letter-color-4);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  height: 2rem;
  width: 2rem;
  &:hover {
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
  }
  > svg,
  img {
    height: 2rem;
    width: 2rem;
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
