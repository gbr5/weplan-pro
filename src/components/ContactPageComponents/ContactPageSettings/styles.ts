import { shade } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: block;
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

    > h3 {
      color: var(--title-color);
      margin-bottom: 1rem;
    }
    > h2 {
      border-bottom: 1px solid var(--title-color);
      text-transform: capitalize;
      text-align: center;
      padding-bottom: 0.5rem;
    }
  }

  > section {
    margin-top: 2rem;
    background: var(--background-color);
    border-radius: 4px;
    padding: 0.5rem;
  }
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
`;
