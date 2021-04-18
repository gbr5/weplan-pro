import styled from 'styled-components';
import '../../../styles/global';

export const Container = styled.div`
  width: 10rem;
  height: 3.2rem;
  display: block;
  justify-content: center;
  background: var(--letter-color-2);
  border-radius: 8px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.25);

  > p {
    font-size: 0.8rem;
    width: 90%;
    color: var(--letter-color);
    margin: 0.2rem auto;
    border-bottom: 1px solid var(--secondary-color);
    text-align: center;
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

export const PriorityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1.5rem;
  max-height: 1.5rem;
  margin: 0.5rem;
  border-radius: 5px;
  border: none;
  transition: 0.3s;
  margin: 0 auto;
  padding: 0;
  background: var(--letter-color-4);
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.15);

  &:hover {
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.25);
  }
  > svg,
  img {
    max-height: 1.5rem;
    max-width: 1.5rem;
    &:hover {
      border: 1px solid var(--title-color);
    }
  }
`;
