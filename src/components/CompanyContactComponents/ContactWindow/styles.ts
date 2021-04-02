import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  background: #c9c9c9;
  margin-top: 4rem;
  padding: 0.5rem;
  flex: 1;
  width: 100%;
  height: 90%;
  border-radius: 8px;

  > h1 {
    width: 100%;
    border-bottom: 1px solid var(--secondary-color);
    margin: 1rem auto;
    text-align: center;
  }
`;

export const ContactContainer = styled.div`
  display: flex;
  margin: 1rem auto;
  > p {
    font-size: 1.2rem;

    &:first-child {
      border-bottom: 1px solid var(--letter-color-5);
      min-width: 6rem;
      margin-right: 1rem;
    }
  }
`;
