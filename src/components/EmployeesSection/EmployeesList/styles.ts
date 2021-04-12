import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

export const Employee = styled.div`
  display: flex;
  margin: 1rem auto;
  width: 100%;
  align-items: center;
  justify-content: center;

  > p {
    font-weight: 600;
    width: 24px;
    font-size: 1.2rem;
  }
`;
