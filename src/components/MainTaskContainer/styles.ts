import styled from 'styled-components';
import '../../styles/global';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 332px;
  padding-bottom: 1rem;

  > h2 {
    width: 90%;
    margin: 1.5rem auto 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--secondary-color);
    text-align: center;
  }

  @media (max-width: 700px) {
    height: 26rem;
  }
`;

export const Container = styled.div`
  width: 96%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  background: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  padding: 8px 0.1rem;
  overflow-y: scroll;
`;

export const Task = styled.div`
  display: flex;
  /* height: 40px; */
  width: 100%;
  align-items: stretch;
  justify-content: stretch;
  border: 1px solid var(--title-color);
  padding: 5px;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    border: 1px solid var(--header-primary);
    background: var(--card-color);

    > div {
      > h2 {
        color: var(--title-color);
      }
      > span {
        > p {
          color: var(--letter-color-5);
          &:nth-child(2) {
            color: var(--letter-color-5);
          }
        }
      }
    }
    > button {
      border: 1px solid var(--header-primary);
      background: var(--background-color);

      > svg {
        color: var(--letter-color-5);
      }
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: var(--header-primary);

    width: 100%;

    > span {
      display: flex;
      width: 100%;
      padding-right: 16px;

      > p {
        color: var(--letter-color-2);
        &:nth-child(2) {
          margin-left: auto;
          color: var(--card-color);
        }
      }
    }
  }

  > button {
    background: transparent;
    border: none;
    width: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;

    > svg {
      color: var(--header-primary);
    }

    &:hover {
      border: 1px solid var(--title-primary);
      background: var(--header-background-color);

      > svg {
        color: var(--title-color);
      }
    }
  }
`;
