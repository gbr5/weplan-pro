import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.header`
  position: fixed;
  top: 0;
  z-index: 8;
  padding: 0 1rem;
  width: 100%;
  background: var(--header-background-color);
  display: flex;
  align-items: center;
  min-height: 4rem;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);

  > h1 {
    margin-right: 20px;
    color: var(--letter-color-1);

    > button {
      background: transparent;
      border: none;
      color: var(--letter-color-1);
    }
  }

  > h2 {
    margin: auto;
    font-size: 20px;
    color: var(--title-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;

    &:hover {
      opacity: 0.8;

      > button {
        > svg {
          color: var(--title-color);
        }
      }
    }

    > button {
      background: transparent;
      border: none;
      color: var(--letter-color-3);

      > svg {
        transition: 0.3s;
      }
    }
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;

    > img {
      height: 24px;
    }

    > h1 {
      margin-right: 20px;
      color: var(--letter-color-3);
    }
  }

  > span {
    margin: 0 auto;

    > button {
      border: none;
      background: transparent;
      display: flex;
      align-items: flex-start;
      justify-content: left;
      position: relative;
      > h5 {
        font-size: 20px;
        color: var(--title-color);
        display: flex;
        justify-content: center;
        align-items: unset;
        margin-top: 16px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        > svg {
          color: var(--title-color);
          opacity: 0.5;
        }
      }
      &:hover {
        opacity: 0.8;

        > h5 {
          > svg {
            opacity: 1;
          }
        }
      }
    }
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  button {
    background: transparent;
    border: 0;
    margin-left: 32px;
    font-size: 18px;
    font-weight: 500;
    color: var(--letter-color-1);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    box-shadow: var(--box-shadow);
    border-radius: 50%;

    svg {
      color: var(--header-primary);
      width: 24px;
      height: 24px;
      transition: 0.3s;
    }

    &:hover {
      border: 1px solid var(--title-color);
      border-radius: 4px;
      box-shadow: var(--window-box-shadow);

      svg {
        color: var(--title-color);
      }
    }
  }
`;
