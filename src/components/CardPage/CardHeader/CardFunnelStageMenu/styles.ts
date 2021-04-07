import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  height: 32px;

  @media (max-width: 1100px) {
    overflow-x: scroll;
  }
`;

interface IProps {
  isActive: boolean;
}

export const StageButton = styled.div<IProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 16rem;
  height: 100%;
  transition: 0.3s;
  &:hover {
    font-weight: 500;
    opacity: 0.7;
    background: var(--title-color);
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transition: 0.3s;
    font-size: 20px;

    background: transparent;
    border: none;
  }

  ${props =>
    props.isActive &&
    css`
      background: var(--header-primary);

      &:hover {
        background: var(--header-primary);
        opacity: 0.8;
      }
    `}
`;
