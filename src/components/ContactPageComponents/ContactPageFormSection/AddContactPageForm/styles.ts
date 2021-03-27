import { shade } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch; */
  display: block;
  width: 100%;

  margin: 1rem auto;
`;

export const FormList = styled.div`
  width: 100%;
  margin: 1rem 0;
  /* align-items: center;
  justify-content: flex-start; */
  overflow-x: scroll;
  white-space: nowrap;
`;

interface IProps {
  isSelected: boolean;
}

export const FormOption = styled.button<IProps>`
  display: inline-block;
  width: 14rem;
  /* min-width: 8rem; */
  height: 3rem;
  background: var(--secondary-color);
  color: var(--primary-color);
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);

  margin: 0 1rem;

  transition: 0.3s;

  &:hover {
    background: ${shade(0.2, '#FF9900')};
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  }

  ${props =>
    props.isSelected &&
    css`
      background: var(--primary-color);
      color: var(--secondary-color);
      box-shadow: 0 0 4px 4px rgba(189, 200, 50, 0.3);

      &:hover {
        background: ${shade(0.2, '#222')};
        box-shadow: 0 0 4px 4px rgba(190, 200, 50, 0.4);
      }
    `}
`;
