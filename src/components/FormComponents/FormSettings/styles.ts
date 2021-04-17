import { shade } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 8px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  padding: 1rem;
  max-width: 900px;
  margin: 0 auto;

  overflow-y: scroll;

  > aside {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 1rem;
    flex: 1;

    > h3 {
      color: var(--title-color);
      margin-bottom: 1rem;
    }
    > h2 {
      /* font-size:  */
      border-bottom: 1px solid var(--title-color);
      text-transform: capitalize;
      text-align: center;
      padding-bottom: 0.5rem;
    }

    > button {
      position: absolute;
      top: 8px;
      right: 8px;
      background: transparent;
      border: none;

      color: var(--red-color);
    }
  }

  > section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    text-align: center;
    margin: 1rem 0 1rem;

    > h2 {
      width: 100%;
      text-align: center;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--secondary-color);
    }
    > strong {
      color: var(--letter-color-1);
      font-size: 1.1rem;
    }
  }
  > section:last-child {
    border-bottom: none;
  }
  > span {
    display: flex;
    align-items: center;
    justify-content: stretch;
    gap: 1rem;
    width: 100%;

    > button {
      background: transparent;
      border: none;
      width: 10rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const AddField = styled.button`
  border-radius: 50%;
  height: 3rem;
  width: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  background: var(--secondary-color);

  transition: 0.3s;

  margin: 1rem auto 2rem;

  &:hover {
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
    background: ${shade(0.2, `#ff9900`)};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

interface IButtonProps {
  isActive: boolean;
}

export const BooleanButton = styled.button<IButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${shade(0.5, '#ff9900')};
  font-size: 1.2rem;

  border: none;

  width: 100%;
  height: 3rem;
  border-radius: 4px;

  margin-top: 1rem;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);

  ${props =>
    props.isActive &&
    css`
      background: var(--title-color);
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
      font-size: 1rem;
    `}

  &:first-child {
    margin-right: 1rem;
  }
  &:last-child {
    margin-left: 1rem;
  }
`;
