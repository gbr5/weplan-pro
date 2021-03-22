import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 1rem 0;
`;

export const EditButton = styled.button`
  position: absolute;
  top: 3.5rem;
  right: 8px;
  background: transparent;
  border: none;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;

  background: var(--background-color);
  border-radius: 8px;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  padding-bottom: 1.5rem;

  span {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    h3 {
      text-align: left;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--letter-color-2);
    }
  }
`;
