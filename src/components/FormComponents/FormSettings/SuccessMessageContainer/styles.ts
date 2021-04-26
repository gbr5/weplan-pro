import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;

  > p {
    margin-top: 0.5rem;
    line-height: 1.6rem;
    color: var(--letter-color-4);
    font-size: 1rem;
  }
`;

export const EditButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  background: var(--letter-color-1);
  border-radius: 8px;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  padding-bottom: 1.5rem;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);

  span {
    display: flex;
    flex-direction: column;
    margin: 1rem auto;
    width: 100%;

    h3 {
      width: 90%;
      text-align: center;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--secondary-color);
      margin: 0.5rem auto;
    }
  }
`;
