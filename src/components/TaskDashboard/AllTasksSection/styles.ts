import styled, { css } from 'styled-components';
import '../../../styles/global';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  text-align: center;

  > h2 {
    width: 100%;
    margin: 0 auto;
  }
`;

export const StatusMenuButtonContainer = styled.strong`
  width: 100%;
  height: 100%;
  text-align: left;

  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IStatusButtonProps {
  isActive: boolean;
}

export const StatusMenuButton = styled.button<IStatusButtonProps>`
  margin: 24px auto;
  background: var(--title-color);
  border-radius: 5px;
  border: none;
  opacity: 0.6;
  transition: 0.3s;
  padding: 5px;
  font-size: 24px;
  color: var(--letter-color-5);

  min-height: 3rem;
  width: 100%;

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
      border: 1px solid var(--header-background-color);

      &:hover {
        opacity: 0.5;
        border: 1px solid var(--title-color);
      }
    `}
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: left;
  min-height: 20rem;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  background: var(--header-background-color);
  border-radius: 8px;
  padding: 8px;
  /* margin-left: 80px; */
  gap: 5px;
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
    > div {
      background: transparent;
      border: none;
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
      background: transparent;
      border: none;
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
    box-sizing: border-box;

    width: 100%;

    > span {
      display: flex;
      width: 100%;
      padding-right: 16px;

      > p {
        margin: 0 auto;
        color: var(--letter-color-2);
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
      > svg {
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
