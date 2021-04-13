import styled, { css } from 'styled-components';
import '../../../styles/global';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  padding: 5rem 0.5rem 2rem;
  align-items: center;
  /* box-sizing: border-box; */

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
  background: rgba(150, 150, 150);
  border: none;
  border-radius: 5px;

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
