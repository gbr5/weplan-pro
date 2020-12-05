import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 16px;

  width: 100%;
  height: 100%;

  background: var(--card-color);
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;

  gap: 16px;

  width: 100%;
  padding: 16px;

  span {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 104px;

    img {
      border-radius: 8px;
      height: 80px;
      width: 80px;
    }

    h3 {
      font-size: 24px;
      text-align: center;
      color: var(--letter-color-5);
      border-bottom: 1px solid var(--header-primary);
    }

    p {
      font-size: 16px;
      color: var(--letter-color-5);
      text-align: right;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  gap: 16px;

  width: 100%;
  height: 100%;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 104px;
    gap: 16px;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 16px;

  width: 100%;
  padding: 16px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    a {
      margin: auto;
      font-size: 16px;
      text-decoration: none;
      color: var(--header-background-color);

      strong {
        font-weight: 500;
        color: var(--header-primary);
      }
    }

    h4 {
      margin: auto;
      font-size: 12px;
      color: var(--letter-color-3);
    }
  }
`;

export const PrintButtonContainer = styled.div`
  display: flex;
  width: 100%;

  button {
    width: 100%;
    height: 40px;
    background-color: var(--header-primary);
    border: none;
    background: var(--letter-color-2);
    border-radius: 5px;
    border: 1px solid var(--red-color);
    opacity: 0.8;
    transition: 0.3s;
    padding: 5px;
    margin: auto;
    box-shadow: var(--window-box-shadow);
    color: var(--header-background-color);

    &:hover {
      box-shadow: var(--window-box-shadow);
      background-color: var(--title-color);
      color: var(--red-color);
    }
  }
`;
