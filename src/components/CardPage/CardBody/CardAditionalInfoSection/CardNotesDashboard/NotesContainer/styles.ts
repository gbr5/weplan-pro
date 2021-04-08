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
  border: 1px solid var(--title-color);
  margin: 1rem 0;

  > footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    width: 100%;

    > strong {
      width: 100%;
      min-height: 22px;
      margin: 0 auto;
      font-size: 0.75rem;
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

export const Note = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;

  > p {
    min-height: 26px;
    font-size: 16px;
  }
`;
