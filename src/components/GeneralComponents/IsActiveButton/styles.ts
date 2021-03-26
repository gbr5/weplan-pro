import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface IButtonProps {
  isActive: boolean;
}

export const Container = styled.button<IButtonProps>`
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
