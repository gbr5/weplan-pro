import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  position: relative;

  > span {
    position: absolute;
    top: -1rem;
    left: 1rem;
    > button {
      background: transparent;
      border: none;
    }
  }
`;
