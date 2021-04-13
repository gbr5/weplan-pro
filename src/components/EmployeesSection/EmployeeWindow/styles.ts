import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  padding: 3rem 0;
  width: 100%;
  height: 100%;
`;

export const EmployeeHeader = styled.div`
  display: flex;
  margin: 0 auto 1rem;
`;

export const SubContainer = styled.div`
  display: block;
  border-radius: 8px;
  background: var(--background-color);
  width: 100%;
  height: 100%;
  padding: 1rem;

  > section {
    display: block;
    width: 100%;
    margin: 1rem 0;

    > strong {
      line-height: 2rem;
      font-size: 1.2rem;
    }
  }
`;
