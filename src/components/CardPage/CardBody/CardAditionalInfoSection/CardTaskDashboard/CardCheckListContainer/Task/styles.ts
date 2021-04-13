import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  border: 1px solid var(--title-color);
  padding: 5px;
  border-radius: 5px;
  margin: 0.5rem 0;

  > div {
    display: flex;
    width: 100%;
  }
`;

export const ButtonContainer = styled.strong`
  display: flex;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 2rem;
    max-height: 2rem;
    margin: 0.5rem;
    background: var(--letter-color-4);
  }
`;

export const Status = styled.button`
  margin: 0 auto;
  padding: 0;
  background: transparent;

  > img,
  svg {
    max-height: 2rem;
    max-width: 50px;
    &:hover {
      border: 1px solid var(--title-color);
    }
  }
`;

export const Priority = styled.button`
  margin: 0 auto;
  padding: 0;

  > svg,
  img {
    max-height: 2rem;
    max-width: 2rem;
    &:hover {
      border: 1px solid var(--title-color);
    }
  }
`;
