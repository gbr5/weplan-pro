import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  text-align: center;

  > button {
    background: transparent;
    border: none;
    position: absolute;
    top: 0;
    right: 0;
    color: var(--red-color);
  }
`;
