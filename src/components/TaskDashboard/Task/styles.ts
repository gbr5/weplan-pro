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

  > span {
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      display: block;
      width: 100%;

      > p {
        font-size: 0.95rem;
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
`;

export const LateTask = styled.section`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 1.2rem;
  background: rgba(255, 50, 10, 0.8);
  border-radius: 4px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  margin: 0.5rem auto;

  > svg {
    margin-right: 0.5rem;
  }

  > strong {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;

    > p {
      color: var(--letter-color-1);
      padding-bottom: 0.2rem;
      margin-bottom: 0.2rem;
      border-bottom: 1px solid var(--title-color);
      margin: auto 0.5rem;
    }
  }
`;

export const SettingsButton = styled.button`
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 5px;
  border: none;
  transition: 0.3s;
  /* margin: 0.5rem; */

  > div {
    width: 0.3rem;
    height: 0.3rem;
    margin: 0.2rem auto;
    border-radius: 50%;
    background: var(--letter-color-5);
  }
`;
