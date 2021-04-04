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