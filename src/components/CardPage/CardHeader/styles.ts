import styled from 'styled-components';
import '../../../styles/global';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  gap: 8px;
  padding: 8px;
  width: 100%;
`;

export const CardTitle = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  max-width: 400px;
  align-items: center;
  justify-content: center;
  margin: 0.4rem 1rem;

  > h2 {
    margin: 2rem 1rem 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--secondary-color);
    width: 100%;
    text-align: center;
  }

  > button {
    position: absolute;
    top: 2px;
    right: 2px;
    background: transparent;
    border: none;
    z-index: 2;
  }

  > span {
    position: absolute;
    top: 2px;
    left: 2px;
    color: var(--letter-color-4);
    z-index: 2;
  }
`;

export const StageButton = styled.button`
  background: var(--letter-color-4);
  color: var(--letter-color-1);
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
  }

  > h3 {
    margin: 1rem auto;
  }
  > svg {
    margin: 1rem auto;
  }
`;
