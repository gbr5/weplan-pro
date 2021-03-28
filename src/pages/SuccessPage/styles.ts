import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 2rem;
  height: 100vh;
  width: 100vw;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  flex: 1;
  height: 100%;
  width: 100%;
  background: var(--letter-color-2);
  padding: 1rem;
  text-align: center;
  border-radius: 1rem;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);

  h2 {
    margin: 1rem auto;
  }

  p {
    margin: 1rem auto;
  }
`;
