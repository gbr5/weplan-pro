import styled, { keyframes } from 'styled-components';
import '../../../styles/global';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-150px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  position: fixed;
  z-index: 15;

  top: 5%;
  left: 10%;

  height: 90%;
  width: 80%;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;

  gap: 16px;
  margin: 0 auto;
  padding: 1rem;

  border-radius: 8px;

  background: var(--header-background-color);

  box-shadow: var(--window-box-shadow);

  animation: ${appearFromTop} 0.5s;

  overflow-y: scroll;

  @media (max-width: 1000px) {
    overflow-y: scroll;
    display: block;
    padding: 1rem;
    top: 0%;
    left: 0%;
    height: 100%;
    width: 100%;
  }
  header {
    position: absolute;
    top: 8px;
    right: 8px;
    button {
      background: transparent;
      border: none;
      border-radius: 10px;
      transition: 0.5s;
      padding: 3px 1px 0 2px;
      &:hover {
        border-radius: 50%;
        background: rgba(150, 70, 70, 0.3);
        font-weight: 600;
        border: 0.5px solid var(--title-color);
        opacity: 0.8;
        box-shadow: var(--box-shadow);
      }
      svg {
        color: red;
        transition: 0.5s;
        &:hover {
          color: rgba(255, 10, 5);
        }
      }
    }
  }
`;
