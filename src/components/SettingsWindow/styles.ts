import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  button {
    margin: 1rem 0 1rem;
    background: var(--secondary-color);
    border: none;
    width: 100%;
    height: 2.5rem;

    border-radius: 4px;

    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);

    &:hover {
      background: ${shade(0.2, '#ff9900')};
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
    }
  }
`;

export const ToggleButton = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 1rem;
`;
