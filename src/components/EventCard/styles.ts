import styled, { keyframes } from 'styled-components';
import Tooltip from '../Tooltip';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    z-index: -10;
    background: transparent;
  }
  80% {
    opacity: 0.4;
    z-index: 11;
  }
  90% {
    opacity: 0.8;
    z-index: 0;
  }
  100% {
    opacity: 1;
    z-index: 2;
  }
`;
export const Container = styled.div`
  width: 100%;
  height: 26px;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  animation: ${appearFromTop} 1s;

  > div {
    display: flex;
    margin-right: auto;

    > h2 {
      text-align: left;
      width: 200px;
      font-size: 16px;
      color: var(--letter-color-4);
    }
  }
`;

export const EventDate = styled(Tooltip)`
  display: flex;
  align-items: right;
  justify-content: right;
  margin-left: auto;
  width: 100%;

  > h3 {
    color: var(--primary-color);
    margin-right: 16px;
    margin-left: auto;
  }
  > p {
    font-size: 16px;
    color: var(--letter-color-4);
  }
  > button {
    background: transparent;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;

    color: var(--letter-color-5);
    font-weight: 500;
    font-size: 20px;
  }
`;
