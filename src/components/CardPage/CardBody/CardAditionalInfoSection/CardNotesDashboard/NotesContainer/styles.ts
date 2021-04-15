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

  width: 96vw;
  padding: 5px;
  text-align: center;
  margin: 0.8rem auto;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;

  > textarea {
    font-size: 18px;
    line-height: 32px;
    width: 100%;
    height: 100%;
    padding: 0.8rem;
    text-align: left;
  }

  > footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    width: 100%;

    > strong {
      width: 100%;
      min-height: 22px;
      margin: 0 auto;
      font-size: 0.85rem;
    }
  }

  ${props =>
    props.isActive &&
    css`
      color: var(--letter-color-5);
      background-color: rgba(255, 240, 220);
      opacity: 1;
      transition: 0.25s;
      border: 1px solid var(--header-background-color);
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);

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
    font-size: 18px;
  }

  > strong {
    width: 100%;
    text-align: center;
  }
`;

export const HistoryNote = styled.div`
  display: block;
  width: 100%;

  > h3 {
    width: 100%;
    color: var(--letter-color-5);
    border-bottom: 2px solid var(--secondary-color);
    margin: 0rem auto 0.4rem;
    padding: 0.4rem;
    text-align: center;
  }
`;
