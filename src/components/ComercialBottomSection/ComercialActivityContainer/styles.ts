import styled from 'styled-components';
import '../../../styles/global';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 100%;
  margin: 1.5rem auto;
  border-radius: 8px;

  > h2 {
    margin: 0.5rem auto;
  }
`;

export const Notes = styled.div`
  display: block;
  /* flex-direction: column; */
  /* justify-content: stretch; */
  background: var(--background-color);
  height: 20rem;
  width: 100%;
  overflow-y: scroll;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 0.5rem;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  background: var(--header-background-color);
  border-radius: 8px;
  padding: 8px;
  overflow-y: scroll;
`;

export const Task = styled.div`
  display: flex;
  /* height: 40px; */
  width: 100%;
  align-items: center;
  justify-content: stretch;
  border-bottom: 1px solid var(--title-color);
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
    }
    > span {
      > p {
        color: var(--letter-color-5);
      }
    }
  }

  > div {
    display: flex;
    color: var(--header-primary);

    width: 100%;
  }

  > span {
    display: flex;
    width: 100%;
    padding-right: 16px;

    > p {
      color: var(--letter-color-2);

      > svg {
        color: var(--red-color);
      }
    }
    > svg {
      margin-left: auto;
      color: green;
    }
  }
`;
