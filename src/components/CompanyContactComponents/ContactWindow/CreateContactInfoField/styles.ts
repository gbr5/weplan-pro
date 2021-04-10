import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  position: relative;

  > span {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;

    button {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--red-color);
    }
  }
`;

export const EditFieldContainer = styled.div`
  display: block;
  margin: 1rem 0;
  padding: 0.5rem;
  padding-top: 2rem;
  flex: 1;
  background: var(--letter-color-2);
  border-radius: 4px;

  > span {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;

    button {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--red-color);
    }
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  margin: 1rem auto;

  strong {
    font-size: 1.2rem;
    border-bottom: 1px solid var(--letter-color-5);
    min-width: 6rem;
    margin-right: 1rem;
  }

  > p {
    font-size: 1.2rem;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    width: 100%;
    > p {
      &:first-child {
        margin: 0;
      }
      text-align: center;
      margin-bottom: 0.5rem;
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
