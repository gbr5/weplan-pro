import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 2rem;
  height: 2rem;
  > button {
    transition: 0.3s;
    width: 2rem;
    height: 2rem;
    border-radius: 5px;
    border: none;
    width: 100%;
    height: 100%;
    margin: auto 0.5rem;
    padding: 0.1rem 0.2rem;
    background: var(--letter-color-4);
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);

    &:hover {
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
    }
    > svg,
    img {
      max-height: 2rem;
      max-width: 2rem;
      &:hover {
        border: 1px solid var(--title-color);
      }
    }
  }
`;

export const SelectPriorityContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: -3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > span {
    /* border-radius: 0 0 50% 50%; */
    /* background: var(--letter-color-4); */
    /* height: 1.5rem;
    width: 6rem; */
    /* background: red; */

    border-top: 0.7rem solid var(--letter-color-2);
    border-right: 0.7rem solid transparent;
    border-left: 0.7rem solid transparent;
    opacity: 0.8;
  }
`;
