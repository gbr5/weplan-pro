import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  width: 80%;
  left: 10%;
  height: 50%;
  padding: 0.4rem 1rem;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 10%;
  z-index: 15;
  background: #c9c9c9;
  border-radius: 8px;

  @media (max-width: 1100px) {
    overflow-y: scroll;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  position: fixed;
  top: 5rem;
  left: 44%;
  color: red;
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
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.5);
  color: var(--letter-color-1);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  margin: 1rem 0;
  font-weight: 500;
  opacity: 0.7;
  background: var(--title-color);
  height: 2rem;

  > button {
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
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);

      &:hover {
        background: var(--header-primary);
        opacity: 0.8;
      }
    `}
`;
