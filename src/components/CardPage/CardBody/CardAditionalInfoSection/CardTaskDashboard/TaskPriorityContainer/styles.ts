import styled from 'styled-components';
import '../../../../../../styles/global';

export const Container = styled.div`
  width: 100%;
  height: 80%;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  border-radius: 8px;
  padding: 8px;
  margin-top: 3rem;

  > h2 {
    width: 100%;
    color: var(--letter-color);
    margin: 1rem auto;
    border-bottom: 1px solid var(--secondary-color);
  }

  > span {
    display: block;
    width: 100%;
  }
`;

export const PriorityButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  font-size: 1.3rem;

  margin: 0.5rem;

  > svg {
    margin-left: auto;
    height: 64px;
    width: 64px;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    background: #aaa;

    &:hover {
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
    }
  }
`;
