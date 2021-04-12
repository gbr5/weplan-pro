import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  position: relative;

  > button {
    position: absolute;
    top: 0;
    left: 45%;
    background: transparent;
    border: none;
    color: var(--red-color);
  }
`;
