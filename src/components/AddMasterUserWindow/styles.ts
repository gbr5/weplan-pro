import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 32px;

  img {
    position: fixed;
    top: 16px;
    left: 16px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    width: 100%;

    button {
      background: var(--primary-color);
      border: none;
      transition: 0.3s;

      &:hover {
        opacity: 0.8;
        box-shadow: var(--window-box-shadow);
      }
    }

    a {
      color: var(--primary-color);
      transition: 0.3s;
      text-decoration: none;

      &:hover {
        color: var(--title-color);
      }
    }
  }

  h1 {
    font-size: 24px;
    color: var(--primary-color);
    margin: 16px auto;
  }

  > input {
    position: absolute;
    top: 7%;
    left: 5%;
    height: 40px;
    width: 90%;
    border-radius: 8px;
    border: none;
    background: var(--card-color);
    color: var(--letter-color-5);
    padding-left: 16px;
  }

  > ul {
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    > li {
      display: flex;
      font-size: 16px;
      font-weight: 500;
      text-align: left;
      padding: 16px;
      transition: 0.3s;

      > button {
        margin-left: auto;
        width: 150px;
        transition: 0.3s;
      }

      > span {
        margin-left: auto;

        button {
          background: var(--background-color);
          color: var(--primary-color);
          width: 150px;
          transition: 0.3s;
        }
      }

      &:hover {
        opacity: 0.6;

        button {
          background: var(--background-color);
          color: var(--primary-color);
        }

        span {
          button {
            background: var(--primary-color);
            color: var(--background-color);
          }
        }
      }
    }
  }
`;
