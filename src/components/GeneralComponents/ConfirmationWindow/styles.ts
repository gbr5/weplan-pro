import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  padding-top: 4rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;

  > button {
    width: 100%;
    height: 40px;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);

    &:hover {
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
    }
  }

  > button:first-child {
    background: var(--secondary-color);
    color: var(--primary-color);
    margin-right: 0.5rem;
  }
  > button:last-child {
    background: var(--primary-color);
    color: var(--secondary-color);
    margin-left: 0.5rem;
  }
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);

  align-items: stretch;
  justify-content: space-around;
  padding: 1rem;
  width: 100%;
  height: 90%;
  border-radius: 8px;
  background: var(--background-color);

  > strong {
    margin: 1rem 0;
    line-height: 2rem;
    text-align: center;
  }
`;
