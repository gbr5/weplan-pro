import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 0.5rem;
  margin-top: 2rem;
  position: relative;

  background: var(--background-color);
  border-radius: 5px;

  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);

  > span {
    position: absolute;
    top: 0;
    right: 0;

    > button {
      background: transparent;
      border: none;

      color: var(--red-color);

      &:hover {
        color: ${shade(0.2, '#ff9999')};
      }
    }
  }

  > section {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    text-align: center;
    margin: 1rem 0 1rem;
    width: 100%;

    > h2 {
      width: 100%;
      text-align: center;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--secondary-color);
    }
    > strong {
      color: var(--letter-color-1);
      font-size: 1.1rem;
    }
  }
  section:last-child {
    border-bottom: none;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > span {
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
    margin-top: 0.5rem;
    width: 100%;
    border-radius: 4px;
    padding: 0.5rem;
    background: var(--letter-color-2);
  }
`;
