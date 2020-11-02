import styled from 'styled-components';
import '../../styles/global';

export const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 8;
  padding: 8px;
  width: 100%;
  background: var(--header-background-color);
  display: flex;
  align-items: center;

  > h1 {
    margin-right: 20px;

    > button {
      background: transparent;
      border: none;
      color: var(--letter-color-1);
    }
  }

  > h2 {
    margin: auto;
    font-size: 20px;
    color: var(--header-primary);
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
      color: var(--letter-color-1);

      > svg {
        transition: 0.3s;
      }
    }
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: transparent;
    border: none;

    > img {
      height: 24px;
    }

    > h1 {
      margin-right: 20px;
      color: var(--letter-color-4);
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
      gap: 16px;
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
        gap: 16px;
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
    /* border: 1px solid var(--primary-color); */
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
    /* &:nth-child(3) {
      svg {
        color: var(--letter-color-1);
        transition: 0.3s;
      }
      &:hover {
        border: 1px solid var(--letter-color-1);
        border-radius: 4px;
        box-shadow: var(--window-box-shadow);

        svg {
          color: var(--title-color);
        }
      }
    } */

    &:nth-child(4) {
      svg {
        color: var(--red-color);
        transition: 0.3s;
      }

      &:hover {
        border: 1px solid var(--red-color);
        border-radius: 4px;
        box-shadow: var(--window-box-shadow);

        svg {
          color: var(--title-color);
        }
      }
    }
  }
`;

export const ToggleButton = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;
