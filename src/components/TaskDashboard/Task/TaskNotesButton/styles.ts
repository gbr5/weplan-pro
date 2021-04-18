import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 0.5rem; */
  width: 2rem;
  height: 2rem;

  > button {
    transition: 0.3s;
    width: 2rem;
    height: 2rem;
    border-radius: 5px;
    border: none;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
    background-color: var(--letter-color-4);

    &:hover {
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
    }
    > svg {
      max-height: 2rem;
      max-width: 2rem;
    }
  }
  position: relative;
`;

export const NewTaskNotesContainer = styled.aside`
  position: absolute;
  z-index: 2;
  top: -1.1rem;
  right: -1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 1.7rem;
  width: 1.7rem;
  background: var(--red-color);
  border-radius: 50%;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);

  > p {
    font-size: 0.9rem;
  }
`;
