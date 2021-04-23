import styled, { css, keyframes } from 'styled-components';
import '../../styles/global';

const appearFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Modules = styled.section`
  background: var(--background-color);
  background: transparent;
  width: 100%;
  transition: 0.5s;

  display: grid;
  grid-template-columns: repeat(5, 1fr);

  margin: 0 auto;

  border-bottom: 1px solid var(--primary-color);

  > button {
    background: transparent;
    border: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > img {
    position: fixed;
    top: 44px;
    left: 0px;
    max-width: 50px;
    max-height: 44px;
    margin: auto 0;
  }

  @media (max-width: 1000px) {
    overflow-x: scroll;
    padding-left: 3rem;
  }
`;

interface IActivePropsDTO {
  isActive: boolean;
}

export const ModuleTitle = styled.div<IActivePropsDTO>`
  transition: 0.3s;
  height: 28px;
  animation: ${appearFromTop} 0.5s;

  &:hover {
    border-bottom: 1.2px solid var(--primary-color);

    > strong {
      color: var(--letter-color-2);
    }
  }

  > strong {
    color: var(--letter-color-4);
    font-size: 20px;
    line-height: 26px;
    transition: 0.3s;
    display: block;
  }

  ${props =>
    props.isActive &&
    css`
      border: none;
      border-bottom: 2px solid var(--header-primary);
      transition: 0.25s;

      > strong {
        color: var(--primary-color);
      }

      &:hover {
        opacity: 0.8;

        > strong {
          color: var(--header-primary);
        }
      }
    `}
`;
