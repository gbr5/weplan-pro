import styled from 'styled-components';
import '../../../../../styles/global';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* box-sizing: border-box; */
  max-width: 100vw;
  text-align: center;
  overflow-y: scroll;

  h2 {
    width: 100%;
    margin: 0 auto;
  }
`;

export const ContainerMenu = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--letter-color-3);

  @media (max-width: 1100px) {
    overflow-x: scroll;
  }

  > p {
    font-size: 20px;
    /* border-bottom: 2px solid var(--header-primary); */
    /* background: rgba(0, 0, 0, 0.05); */
    padding: 5px;
    height: 100%;
    border-radius: 8px;
    box-shadow: var(--box-shadow);

    @media (max-width: 1100px) {
      display: none;
    }
  }

  > button {
    background: transparent;
    border: none;
    margin-right: auto;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;

    strong {
      height: 32px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      background: var(--header-primary);
      color: var(--header-background-color);
      border-radius: 8px;
      border: 1px solid var(--header-background-color);
      box-shadow: var(--box-shadow);

      transition: 0.5s;

      &:hover {
        background: var(--header-background-color);
        color: var(--header-primary);
        border-radius: 16px;
        border: 1px solid var(--header-primary);
        box-shadow: var(--window-box-shadow);
      }
    }
  }
`;
