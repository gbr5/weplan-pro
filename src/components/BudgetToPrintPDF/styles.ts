import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;

  gap: 16px;

  width: 100%;
  height: 100%;
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
      font-size: 20px;
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
  align-items: stretch;
  justify-content: center;

  gap: 16px;

  width: 100%;
  height: 100%;
`;
