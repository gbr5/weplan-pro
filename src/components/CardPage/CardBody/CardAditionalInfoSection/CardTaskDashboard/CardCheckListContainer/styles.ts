import styled, { css } from 'styled-components';
import '../../../../../../styles/global';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 5px;
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    width: 100%;
    margin: 0 auto;
  }
`;

export const CheckListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0.5rem;
  text-align: center;
`;

export const CheckListHeader = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  position: relative;
  margin: 1rem 0;

  h2 {
    width: 100%;
    margin: 0 auto;
    border-bottom: 2px solid var(--header-primary);
  }

  button {
    position: absolute;
    top: 0;
    right: 0;

    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--header-primary);
    color: var(--letter-color-5);
    border-radius: 50%;
    border: none;
    /* border: 1px solid var(--letter-color-5); */
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);

    transition: 0.5s;

    &:hover {
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.6);
    }
  }
`;

export const StatusMenuButtonContainer = styled.strong`
  max-width: 100vw;
  height: 100%;
  margin: 0.5rem 0;

  display: flex;
  align-items: center;
  justify-content: stretch;
`;

interface IStatusButtonProps {
  isActive: boolean;
}

export const StatusMenuButton = styled.button<IStatusButtonProps>`
  background: var(--title-color);
  border-radius: 5px;
  border: none;
  transition: 0.3s;
  padding: 5px;
  font-size: 24px;
  color: var(--letter-color-4);
  height: 3rem;
  width: 6rem;
  margin: 0 0.5rem;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    opacity: 1;
    border: 1px solid var(--header-primary);
  }

  ${props =>
    props.isActive &&
    css`
      color: var(--letter-color-5);
      background-color: var(--header-primary);
      opacity: 1;
      transition: 0.25s;

      &:hover {
        border: 1px solid var(--title-color);
      }
    `}
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 20rem;
  text-align: left;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  background: var(--header-background-color);
  border-radius: 8px;
  padding: 0.5rem;
  overflow-y: scroll;
`;

export const Task = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  /* height: 40px; */
  /* width: 100%; */
  align-items: stretch;
  justify-content: stretch;
  border: 1px solid var(--title-color);
  padding: 5px;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
    div {
      background: transparent;
      border: none;
      span {
        p {
          color: var(--letter-color-5);
          &:nth-child(2) {
            color: var(--letter-color-5);
          }
        }
      }
    }
    button {
      background: transparent;
      border: none;
      svg {
        color: var(--letter-color-5);
      }
    }
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: var(--header-primary);
    box-sizing: border-box;

    width: 100%;

    span {
      display: flex;
      width: 100%;
      padding-right: 16px;

      p {
        margin: 0 auto;
        color: var(--letter-color-2);
      }
    }
  }

  button {
    background: transparent;
    border: none;
    width: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;

    svg {
      color: var(--header-primary);
    }

    &:hover {
      svg {
        color: var(--title-color);
      }
    }
  }
`;

export const ButtonContainer = styled.strong`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  button:first-child {
    padding: 0;
    svg {
      padding: 0;
      background-color: var(--card-color);
      border-radius: 2px;
    }
  }
  button {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    width: 350px;

    h3 {
      border-bottom: 1px solid var(--title-color);
    }
    p {
      font-weight: 500;
      font-size: 20px;
      color: var(--letter-color-3);
    }
  }
`;

export const Status = styled.button`
  margin: 0 auto;
  padding: 0;
  background: transparent;

  img {
    height: 50px;
    &:hover {
      border: 1px solid var(--title-color);
    }
  }
`;

export const Priority = styled.button`
  margin: 0 auto;
  padding: 0;

  svg {
    height: 50px;
    &:hover {
      border: 1px solid var(--title-color);
    }
  }
`;
