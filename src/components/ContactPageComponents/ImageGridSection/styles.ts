import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  overflow-y: scroll;
`;

export const AddImage = styled.button`
  background: var(--primary-color);
  color: var(--secondary-color);
  height: 30vw;
`;

export const Post = styled.a`
  flex: 1;
  height: 30vw;
  text-decoration: none;

  img {
    flex: 1;
    width: 30vw;
    height: 30vw;
  }
`;
