import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    > button {
      background: var(--secondary-color);
      border: 1px solid var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      color: var(--primary-color);
      box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.15);
      transition: 0.5s;

      &:hover {
        background: var(--title-color);
        box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
      }
    }
  }
`;

export const ListContainer = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;

  overflow-y: scroll;
  height: 75vh;
`;

export const PageSection = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #ff9900;
  border: none;
  width: 20rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1.4rem;
  transition: 0.3s;
  text-transform: capitalize;
  margin-top: 1rem;

  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: ${shade(0.3, '#ff9900')};
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.25);
  }

  img {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    margin-right: 1rem;
  }

  strong {
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
  }
`;
