import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  align-items: center;
  flex-direction: center;
  position: relative;
  margin: 1rem auto;
  text-align: center;

  > span {
    position: absolute;
    top: -1rem;
    left: 48%;

    > button {
      color: red;
      border: none;
      background: transparent;
    }
  }

  > button {
    background: rgba(15, 250, 80, 0.2);
    border: 1px solid var(--title-color);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
    border-radius: 8px;
    color: rgba(10, 95, 10);
  }
`;
