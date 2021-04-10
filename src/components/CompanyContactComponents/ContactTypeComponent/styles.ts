import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  position: relative;

  > span {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;

    > button {
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
  margin: 0.5rem 0;
  padding: 0.5rem;
  padding-top: 1rem;
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
  flex-direction: column;
  margin: 0.5rem auto;

  > strong {
    width: 100%;
    border-bottom: 1px solid var(--letter-color-3);
    margin: 0.5rem 0;
    text-align: left;
  }
`;
