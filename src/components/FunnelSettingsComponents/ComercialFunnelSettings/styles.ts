import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  margin: 5rem auto 2rem;
  width: 100%;
  height: 100%;

  > h1 {
    font-size: 24px;
    text-align: center;
    width: 90%;
    margin: 0.5rem auto 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--secondary-color);
  }

  > section {
    text-align: center;
    > h2 {
      font-size: 20px;
    }
  }
`;

export const AddButton = styled.button`
  border-radius: 50%;
  height: 3rem;
  width: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  background: var(--secondary-color);

  transition: 0.3s;

  margin: 2rem auto;

  &:hover {
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
    background: ${shade(0.2, `#ff9900`)};
  }
`;
