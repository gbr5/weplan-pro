import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  width: 100%;

  > h3 {
    margin: 0 auto 0.4rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid var(--background-color);
    color: var(--secondary-color);
  }

  > div {
    display: block;
    padding: 0.5rem;
    border-radius: 4px;
    width: 100%;
    height: 8rem;
    overflow-y: scroll;
    background: var(--letter-color-1);
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  }
`;
