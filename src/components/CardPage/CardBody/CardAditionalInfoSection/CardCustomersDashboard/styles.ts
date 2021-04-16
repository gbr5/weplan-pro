import styled from 'styled-components';
import '../../../../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* box-sizing: border-box; */
  width: 100%;
  text-align: center;
  overflow-y: scroll;

  h2 {
    width: 90%;
    margin: 1rem auto;
    border-bottom: 2px solid var(--secondary-color);
    padding: 0.5rem;
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 90%;
  text-align: center;
  position: relative;
  margin: 1rem auto;

  > h2 {
    width: 100%;
    margin: 0 auto;
    border-bottom: 2px solid var(--header-primary);
  }

  > button {
    position: absolute;
    top: 0;
    right: 0;

    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--header-primary);
    color: var(--letter-color-5);
    border-radius: 50%;
    border: none;
    /* border: 1px solid var(--letter-color-5); */
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);

    transition: 0.5s;

    &:hover {
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.6);
    }
  }
`;

export const CustomerContainer = styled.div`
  display: block;
  height: 25rem;
  overflow-y: scroll;
  width: 100%;
  padding: 0.5rem;
`;

export const CustomerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  background: var(--secondary-color);
  color: var(--letter-color-5);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  border: none;
  border-radius: 6px;
  font-size: 1.3rem;
  font-weight: 500;
  text-transform: capitalize;
  margin: 1rem 0;

  &:hover {
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  }
`;
