import styled from 'styled-components';
import '../../../../../styles/global';

export const Main = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 0;
`;

export const Notes = styled.div`
  display: block;
  /* flex-direction: column; */
  /* justify-content: stretch; */
  background: var(--background-color);
  height: 28rem;
  width: 95%;
  overflow-y: scroll;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  margin: 1rem auto;
  padding: 0.5rem;
`;

export const ContainerMenu = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--letter-color-3);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
  z-index: 2;

  > button {
    background: transparent;
    border: none;
    margin-right: auto;

    display: flex;
    align-items: center;
    justify-content: center;

    > p {
      font-size: 20px;
      border-bottom: 2px solid var(--header-primary);
      background: rgba(0, 0, 0, 0.05);
      padding: 5px;
      height: 100%;
      border-radius: 8px;
      box-shadow: var(--box-shadow);
      margin-right: 1rem;
    }

    > strong {
      height: 32px;
      padding: 0 16px;
      display: flex;
      align-items: center;
      justify-content: center;

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
