import styled, { keyframes } from 'styled-components';
import '../../../../styles/global';

const appearFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-150px);
  }
  100% {
    opacity: 1;
    z-index: 2;
  }
`;
const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-250px);
  }
  100% {
    opacity: 1;
    z-index: 2;
  }
`;

export const ButtonContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  animation: ${appearFromTop} 1s;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  gap: 5px;
  position: relative;
  padding: 32px 5px 5px;

  animation: ${appearFromLeft} 1s;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 5px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: stretch;
      width: 100%;
      gap: 5px;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        width: 100%;
        height: 32px;

        p {
          border-bottom: 1px solid var(--title-color);
          width: 100%;
        }

        strong {
          font-weight: 500;
          margin-right: 8px;
          border: none;
          width: 250px;
        }

        button {
          background: transparent;
          border: none;
          margin-left: auto;
          transition: 0.3s;
          border-radius: 2px;
          height: 32px;
          width: 32px;

          &:hover {
            background: var(--title-color);

            svg {
              color: var(--header-background-color);
            }
          }
        }
      }
    }
  }
`;

export const CardParticipantsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  color: var(--header-primary);
  background-color: var(--header-background-color);
  border: 1px solid var(--header-primary);
  border-radius: 8px;
  transition: 0.5s;
  padding: 5px 32px;

  strong {
    margin-right: auto;
  }

  strong {
    margin-left: auto;
  }

  &:hover {
    color: var(--header-background-color);
    background-color: var(--header-primary);
    border: 1px solid var(--header-background-color);
  }
`;
export const ButtonArrowMenu = styled.button`
  position: absolute;
  left: 8px;
  top: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--header-primary);
  background-color: var(--header-background-color);
  border: 1px solid var(--header-primary);
  border-radius: 8px;
  transition: 0.5s;

  &:hover {
    color: var(--header-background-color);
    background-color: var(--header-primary);
    border: 1px solid var(--header-background-color);
    border-radius: 50%;
  }
`;
