import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  padding-top: 5rem;
`;

export const SubContainer = styled.div`
  display: block;
  padding: 2rem;

  @media (max-width: 700px) {
    padding: 0.5rem;
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 1rem;

    > h1 {
      margin-right: 1rem;
    }

    > button {
      margin-left: 1rem;
      border: none;
      background: var(--secondary-color);
      padding: 0.5rem;
      border-radius: 8px;
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
    }
  }
`;
