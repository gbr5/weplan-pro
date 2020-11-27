import styled, { css } from 'styled-components';
import '../../../../../../styles/global';

interface IContainerProps {
  isActive: boolean;
}

export const Container = styled.button<IContainerProps>`
  display: flex;
  flex-direction: column;
  min-height: 40px;
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  text-align: center;

  p {
    width: 100%;
    min-height: 26px;
    margin: 0 auto;
    font-size: 16px;
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-content: stretch;

    strong {
      width: 100%;
      min-height: 22px;
      margin: 0 auto;
      font-size: 12px;
    }
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
