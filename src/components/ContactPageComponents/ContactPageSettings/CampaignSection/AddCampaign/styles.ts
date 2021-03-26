import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin: 1rem 0;
  position: relative;

  h3 {
    margin: 0.5rem auto;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--secondary-color);
  }

  > span {
    position: absolute;
    top: 2px;
    right: 2px;

    > button {
      background: transparent;
      border: none;
      color: var(--red-color);
    }
  }
  > section {
    width: 100%;
    display: flex;
    flex-direction: column;

    > strong {
      margin: 1rem auto 0.25rem;
      text-align: left;
      padding: 0.5rem;
      width: 100%;
    }

    > p {
      width: 100%;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      text-align: center;
      padding: 0.5rem;
    }
  }
`;
