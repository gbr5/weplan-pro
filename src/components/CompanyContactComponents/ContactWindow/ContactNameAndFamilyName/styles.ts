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
  margin: 0.5rem 0;
  padding: 0.5rem;
  padding-top: 1rem;
  flex: 1;
  background: var(--letter-color-2);
  border-radius: 4px;
`;

export const FieldContainer = styled.div`
  display: flex;
  margin: 1rem auto;

  > h1 {
    width: 100%;
    border-bottom: 1px solid var(--secondary-color);
    margin: 1rem auto;
    text-align: center;
  }
`;
