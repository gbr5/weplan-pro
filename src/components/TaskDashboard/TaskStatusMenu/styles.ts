import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 1rem auto;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: space-around;
`;

interface IStatusButtonProps {
  isActive: boolean;
}

export const StatusMenuButton = styled.button<IStatusButtonProps>`
  border-radius: 12px;
  border: none;
  height: 4rem;
  width: 4rem;
  margin: 0 auto 1.5rem;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.35);

  > img {
    border-radius: 12px;
    height: 4rem;
    width: 4rem;
  }
  > p {
    font-weight: 400;
  }

  ${props =>
    props.isActive &&
    css`
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.35);

      height: 6rem;
      width: 6rem;

      > img {
        height: 6rem;
        width: 6rem;
      }
      > p {
        font-size: 1.2rem;
      }
    `}
`;
