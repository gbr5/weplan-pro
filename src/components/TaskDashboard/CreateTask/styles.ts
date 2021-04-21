import styled from 'styled-components';
import '../../../../../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  width: 100%;
  margin-top: 3rem;
  border-radius: 8px;
  background: var(--background-color);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  padding: 1rem 0.8rem;

  min-height: 11rem;
`;
