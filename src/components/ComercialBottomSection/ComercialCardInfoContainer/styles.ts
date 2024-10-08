import styled from 'styled-components';
import '../../../styles/global';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 100%;

  @media (max-width: 1100px) {
    width: 100%;
  }

  > h2 {
    margin: 0.5rem auto;
  }
`;

export const Container = styled.div`
  width: 95%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  background: var(--letter-color-4);
  border-radius: 8px;
  padding: 1rem;
  overflow-y: scroll;
  position: relative;
  padding-top: 2.4rem;
  margin: 0rem auto;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
`;

export const CardCustomersSection = styled.span`
  display: block;
  flex: 1;
  width: 100%;
  margin-top: 0.5rem;

  > strong {
    width: 100%;
    margin: 0.5rem auto;
    padding: 0.5rem;
    font-size: 1.2rem;
    /* font-weight: 500; */
    border-bottom: 1px solid var(--title-color);
    color: var(--secondary-color);
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: stretch;
    width: 90vw;
    margin: 0.4rem auto;
    overflow-x: scroll;

    > button {
      background: var(--letter-color-1);
      border: none;
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
      min-width: 8rem;
      width: 100%;
      height: 2.5rem;
      border-radius: 5px;

      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      margin: 1rem;
    }
  }
`;

export const LastUpdate = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  display: flex;
  align-items: center;
  top: 0.5rem;
  right: 0.5rem;
  border-bottom: 1px solid var(--background-color);
  padding: 0 0.5rem 0.2rem;
  z-index: 2;

  > strong {
    color: var(--secondary-color);
    font-size: 0.8rem;
    font-weight: 500;
    margin-right: 0.5rem;
  }

  > p {
    color: var(--letter-color-1);
    font-size: 0.8rem;
  }
`;

export const GoToCardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: stretch;
  background: transparent;
  border: none;
  margin-top: 0.4rem;

  width: 100%;
  padding: 0.5rem auto;
  min-height: 2rem;
  text-align: left;

  > p {
    color: var(--letter-color-1);
    width: 150px;

    &:first-child {
      color: var(--header-primary);
      font-size: 1.2rem;
    }
  }
`;
