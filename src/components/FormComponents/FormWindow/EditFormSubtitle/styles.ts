import styled from 'styled-components';

export const Container = styled.div`
  display: block;
`;

export const EditField = styled.div`
  display: block;
  margin: 1rem;
`;

export const DescriptionField = styled.div`
  display: block;
  position: relative;
  margin-bottom: 1rem;

  > button {
    background: transparent;
    border: none;
    position: absolute;

    color: red;

    top: -1rem;
    right: 2px;
  }
`;
