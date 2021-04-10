import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  width: 100%;
  height: 3rem;
  align-items: center;
  flex-direction: center;
  position: relative;
  margin: 0.2rem auto;
  text-align: center;

  input {
    padding-left: 8px;
  }

  > button {
    margin: 1rem auto;
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  > button {
    &:first-child {
      margin-right: 0.5rem;
    }
    &:last-child {
      margin-left: 0.5rem;
    }
  }
`;
