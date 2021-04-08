import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  margin: 0.5rem 0;
  position: relative;

  > button {
    background: transparent;
    border: none;
    margin-left: auto;
    transition: 0.3s;
    border-radius: 2px;
    height: 32px;
    width: 32px;
    position: absolute;
    top: 0;
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
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  height: 32px;

  > p {
    border-bottom: 1px solid var(--title-color);
    width: 100%;
  }

  > strong {
    font-weight: 500;
    margin-right: 8px;
    border: none;
    width: 250px;
  }
`;

export const EditField = styled.div`
  display: flex;

  strong {
    font-weight: 500;
    margin-right: 8px;
    border: none;
    width: 250px;
  }
`;
