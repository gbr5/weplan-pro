import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0.4rem;

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

export const AddFieldContainer = styled.div`
  display: block;
  margin: 1rem 0;
  padding: 0.5rem;
  padding-top: 2rem;
  flex: 1;
  background: var(--letter-color-2);
  border-radius: 4px;

  > section {
    > textarea {
      border-radius: 8px;
      line-height: 1.8rem;
      font-size: 1.1rem;
      padding: 0.3rem;
    }
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  margin: 1rem auto;

  > strong {
    font-size: 1.2rem;
    border-bottom: 1px solid var(--letter-color-5);
    min-width: 6rem;
    margin-right: 1rem;
  }

  > p {
    font-size: 1.2rem;
  }

  > footer {
    margin-left: auto;
    margin-top: 1rem;
    border-radius: 2px;
    padding: 0.3rem;
    background: rgba(215, 210, 208);
    border: 1px solid rgba(0, 0, 0, 0.5);

    > p {
      font-size: 0.8rem;
      color: rgba(0, 0, 0, 0.95);
    }
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

  margin: 1rem auto 3rem;

  &:hover {
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
    background: ${shade(0.2, `#ff9900`)};
  }
`;
