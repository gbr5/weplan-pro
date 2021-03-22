import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmailButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
  border: none;
  background: var(--background-color);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding-left: 1rem;

  p {
    text-align: left;
    width: 2rem;
  }

  strong {
    padding-left: 1rem;
  }
`;
