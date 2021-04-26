import styled from 'styled-components';

export const Container = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0.5rem auto;
  width: 90%;
  max-width: 300px;
  height: 5rem;

  > p {
    position: absolute;
    top: -1rem;
    left: -1rem;
    width: 10rem;
    text-align: center;
    border-bottom: 1px solid var(--secondary-color);
    padding-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  > strong {
    width: 90%;
    margin: 3rem auto 1rem;
    text-align: center;
    font-size: 1.3rem;
    color: var(--secondary-color);
    padding: 1rem;
    border-radius: 8px;
    background: var(--letter-color-4);
  }
`;
export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  background: var(--background-color);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  height: 18rem;
  padding: 1rem;

  > strong {
    font-size: 1.2rem;
    margin: 1rem auto;
    width: 100%;
    text-align: center;
  }
  > button {
    margin: 1rem auto;
  }
`;
