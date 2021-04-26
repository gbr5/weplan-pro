import { shade } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > p {
    margin-top: 0.5rem;
    line-height: 1.6rem;
    color: var(--letter-color-4);
    font-size: 1rem;
  }
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--letter-color-1);

  border-radius: 8px;
  width: 100%;
  padding: 1rem;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);

  h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: var(--background-color);
    padding-bottom: 0.5rem;
    border: 1px solid var(--letter-color-4);
    height: 3rem;
    border-radius: 4px;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  }

  button {
    font-size: 1.5rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0.5rem auto;

  > button:first-child {
    margin-right: 0.5rem;
  }
  > button:last-child {
    background: var(--red-color);
    margin-left: 0.5rem;
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

  border: none;

  width: 100%;
  height: 3rem;
  border-radius: 8px;

  margin: 1rem 0 1rem;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);

  ${props =>
    props.isActive &&
    css`
      background: var(--title-color);
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
    `}
`;
