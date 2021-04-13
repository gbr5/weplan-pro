import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  position: relative;
`;

export const FieldContainer = styled.div`
  display: flex;
  height: 40px;

  > button {
    position: absolute;
    top: -1.5rem;
    right: 0.5rem;
    background: transparent;
    border: none;
    color: var(--red-color);
  }
`;
