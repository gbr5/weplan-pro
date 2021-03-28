import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
`;

export const WePlanButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  margin-top: 5rem;

  button {
    height: 40px;
    width: 100%;

    border: 1px solid rgba(0, 0, 0, 0.5);

    border-radius: 8px;

    font-weight: bold;

    transition: 0.3s;

    &:hover {
      box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
    }
  }

  button:first-child {
    background: var(--secondary-color);

    &:hover {
      background: var(--title-color);
    }
  }
  button:last-child {
    background: var(--green);
    &:hover {
      background: var(--primary-color);
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  width: 100%;
`;
export const InputField = styled.div`
  display: block;
`;
