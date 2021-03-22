import { shade } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;

  background: var(--background-color);
  border-radius: 8px;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  padding-bottom: 1.5rem;

  span {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    h3 {
      text-align: left;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--letter-color-2);
    }
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
  height: 40px;

  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);

  ${props =>
    props.isActive &&
    css`
      background: var(--secondary-color);
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
    `}
`;
