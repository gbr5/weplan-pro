import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    position: absolute;
    top: 2px;
    right: 2px;

    > button {
      background: transparent;
      border: none;
      color: var(--red-color);
    }
  }
`;

export const SEOContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  > span {
    position: absolute;
    top: 2px;
    right: 2px;

    > button {
      background: transparent;
      border: none;
      color: var(--red-color);
    }
  }

  > section {
    width: 100%;
    display: flex;
    flex-direction: column;

    > strong {
      margin: 1rem auto;
      text-align: left;
      border-bottom: 1px solid var(--secondary-color);
      padding: 0.5rem;
      width: 100%;
    }

    > p {
      width: 100%;
      margin: 0.5rem auto;
      border-radius: 4px;
      text-align: center;
      padding: 0.5rem;
      border: 1px solid var(--letter-color-2);
    }
    > img {
      height: 240px;
      width: 240px;
      border-radius: 8px;
      margin: 0 auto;
    }
  }
`;
