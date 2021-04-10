import styled, { css } from 'styled-components';
import '../../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  height: 100%;
  padding: 8px;
  padding-top: 3rem;
  overflow-y: scroll;

  background: var(--background-color);
  box-shadow: var(--box-shadow);

  > h1 {
    font-size: 24px;
    width: 90%;
    margin: 1rem auto 1.5rem;
    border-bottom: 1px solid var(--secondary-color);
    text-align: center;
    padding-bottom: 0.5rem;
  }
`;

export const ContactTypeContainer = styled.div`
  display: block;
  width: 100%;

  > section {
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    width: 100%;

    > section {
      display: flex;
      margin: 1rem auto;
      width: 100%;
    }
  }
`;

interface IContactTypeButtonProps {
  isActive: boolean;
}

export const ContactTypeButton = styled.button<IContactTypeButtonProps>`
  background: var(--header-background-color);
  color: var(--header-primary);
  transition: 0.3s;
  border: none;
  border-radius: 4px;
  height: 40px;
  width: 100%;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
  opacity: 0.7;

  &:hover {
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  }

  ${props =>
    props.isActive &&
    css`
      opacity: 1;
      background: var(--header-primary);
      color: var(--letter-color-5);
      box-shadow: var(--window-box-shadow);
      font-weight: 500;
      font-size: 20px;
      transition: 0.3s;
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.5);
      &:hover {
        box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.6);
      }
    `}
`;
