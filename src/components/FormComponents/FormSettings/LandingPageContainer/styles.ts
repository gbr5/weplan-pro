import { shade } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > p {
    margin-top: 0.5rem;
    line-height: 1.6rem;
    color: var(--letter-color-1);
    font-size: 1rem;
  }
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 8px;
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  padding: 1rem 0;

  h3 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: var(--background-color);
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--letter-color-2);
    height: 3rem;
    border-radius: 4px;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
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
  border-radius: 4px;

  margin: 1rem 0 1rem;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);

  ${props =>
    props.isActive &&
    css`
      background: var(--title-color);
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
    `}
`;
