import styled, { css } from 'styled-components';
import '../../../styles/global';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  padding: 5rem 0.5rem 2rem;
  align-items: center;

  > section {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  > input {
    padding: 0.5rem;
    width: 16rem;
    border-radius: 8px;
    color: #010101;
    margin: 1rem 0;
  }
`;

export const FirstRow = styled.div`
  display: block;
  width: 100%;
  height: 100%;
`;

interface IButtonProps {
  isActive: boolean;
}

export const ContactMenuButton = styled.button<IButtonProps>`
  height: 2.5rem;
  min-width: 8rem;
  margin: 0.5rem;
  background: var(--letter-color-3);
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);

  &:hover {
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.35);
  }

  ${props =>
    props.isActive &&
    css`
      color: var(--title-color);
      background: var(--header-background-color);
      opacity: 0.8;
      box-shadow: var(--window-box-shadow);
    `}
`;

export const CompanyContactMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
`;

export const ContactTypeSection = styled.div`
  display: flex;
  width: 90vw;
  overflow-x: scroll;
`;
