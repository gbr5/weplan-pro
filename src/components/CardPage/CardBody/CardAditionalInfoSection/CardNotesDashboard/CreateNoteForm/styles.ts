import styled from 'styled-components';
import '../../../../../../styles/global';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 8px;

  background: var(--card-color);
  box-shadow: var(--box-shadow);

  textarea {
    border: 0.8px solid var(--letter-color-5);
    border-radius: 4px;
    font-weight: 500;
    font-size: 16px;
    transition: 0.5s;
    box-shadow: var(--window-box-shadow);
    background: var(--letter-color-2);
    ::-webkit-input-placeholder {
      color: var(--letter-color-5);
    }
    padding: 0.4rem;
  }

  button {
    height: 2rem;
    width: 2rem;
    background: var(--green-icon);
    border: 0.8px solid var(--title-color);
    border-radius: 4px;
    color: var(--header-background-color);
    font-weight: 500;
    font-size: 24px;
    box-shadow: var(--box-shadow);
    transition: 0.5s;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.4rem;

    &:hover {
      color: var(--header-primary);
      background: var(--header-background-color);
      box-shadow: var(--window-box-shadow);
    }
  }
`;
