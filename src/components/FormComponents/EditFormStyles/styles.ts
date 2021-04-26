import styled from 'styled-components';

export const Container = styled.div`
  margin: 3rem auto 1rem;
  display: block;

  background: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
  padding: 1rem;
  width: 100%;
  height: 80vh;
  max-width: 700px;
  overflow-y: scroll;

  > h2 {
    margin: 1rem auto;
    width: 90%;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--secondary-color);
    text-align: center;
  }

  > section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 1rem auto;
    padding: 1rem;
    height: 16rem;
    border-radius: 8px;
    background: var(--letter-color-4);
    position: relative;

    > strong {
      position: absolute;
      top: 1rem;
      left: 1rem;
      font-size: 1.1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--background-color);
      color: var(--letter-color-1);
    }
  }

  > button {
    height: 3rem;
  }
`;

interface IButtonProps {
  color: string;
}

export const ButtonExample = styled.button<IButtonProps>`
  background: ${props => props.color};
  border-radius: 8px;
  width: 8rem;
  height: 8rem;
  margin: auto;
  border-radius: 8px;
  border: 4px solid var(--background-color);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  position: relative;

  > svg {
    position: absolute;
    top: -2rem;
    right: -2rem;
    color: var(--red-color);
  }

  > p {
    padding: 0.5rem;
    border-radius: 4px;
    height: 2rem;
    width: 7.5rem;
    position: absolute;
    bottom: -2.5rem;
    color: var(--letter-color-5);
    border-bottom: 3px solid ${props => props.color};
    background: var(--background-color);
  }
`;
