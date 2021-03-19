import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    button {
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
  display: grid;
  grid-template-columns: repeat(3 1fr);
`;

export const PageSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3 1fr);
`;
