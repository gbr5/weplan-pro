import styled, { css } from 'styled-components';
import '../../../../../../styles/global';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 5px;
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    width: 100%;
    margin: 0 auto;
  }
`;

export const CheckListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0.5rem;
  text-align: center;
`;

export const CheckListHeader = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  position: relative;
  margin: 1rem 0;

  h2 {
    width: 100%;
    margin: 0 auto;
    border-bottom: 2px solid var(--header-primary);
  }

  button {
    position: absolute;
    top: 0;
    right: 0;

    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--header-primary);
    color: var(--letter-color-5);
    border-radius: 50%;
    border: none;
    /* border: 1px solid var(--letter-color-5); */
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);

    transition: 0.5s;

    &:hover {
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.6);
    }
  }
`;

export const StatusMenuButtonContainer = styled.strong`
  max-width: 100vw;
  margin: 0.5rem 0;

  display: flex;
  align-items: center;
  justify-content: stretch;
`;

interface IStatusButtonProps {
  isActive: boolean;
}

export const StatusMenuButton = styled.button<IStatusButtonProps>`
  background: var(--title-color);
  border-radius: 5px;
  border: none;
  transition: 0.3s;
  padding: 5px;
  font-size: 24px;
  color: var(--letter-color-4);
  height: 3rem;
  width: 6rem;
  margin: 0 0.5rem;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    opacity: 1;
    border: 1px solid var(--header-primary);
  }

  ${props =>
    props.isActive &&
    css`
      color: var(--letter-color-5);
      background-color: var(--header-primary);
      opacity: 1;
      transition: 0.25s;

      &:hover {
        border: 1px solid var(--title-color);
      }
    `}
`;

export const Container = styled.div`
  width: 95vw;
  height: 35rem;
  min-height: 20rem;
  text-align: left;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  background: var(--background-color);
  border-radius: 8px;
  padding: 0.2rem;
  overflow-y: scroll;

  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
`;
