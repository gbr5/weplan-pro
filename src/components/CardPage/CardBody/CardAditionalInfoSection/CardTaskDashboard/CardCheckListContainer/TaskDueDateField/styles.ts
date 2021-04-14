import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  position: relative;
  margin: 1rem 0;

  > span {
    position: absolute;
    top: 4px;
    right: 46%;
    > button {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  > strong {
    margin: 0.5rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--secondary-color);
  }

  > button {
    margin-top: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
    width: 100%;
    border: none;
    background: var(--letter-color-1);
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  }
`;
