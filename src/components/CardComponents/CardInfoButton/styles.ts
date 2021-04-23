import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  margin: 1rem 0 0.2rem;
  position: relative;
  width: 100%;

  > button {
    background: transparent;
    border: none;
    margin-left: auto;
    transition: 0.3s;
    border-radius: 2px;
    height: 32px;
    width: 32px;
    position: absolute;
    top: 2px;
    right: 2px;

    &:hover {
      svg {
        color: var(--title-color);
      }
    }
  }
`;

export const CardInfoField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.8);
  padding-bottom: 0.5rem;

  > p {
    width: 100%;
    font-size: 20px;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
  }

  > strong {
    font-weight: 500;
    margin-bottom: 1rem;
    margin-right: auto;
    border: none;
    /* width: 250px; */
    border-bottom: 1px solid rgba(0, 0, 0, 0.7);
    font-size: 18px;
  }
`;

export const EditField = styled.div`
  display: flex;
  flex-direction: column;

  > strong {
    font-weight: 500;
    margin-right: 8px;
    border: none;
    width: 250px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.7);
    font-size: 18px;
  }
`;
