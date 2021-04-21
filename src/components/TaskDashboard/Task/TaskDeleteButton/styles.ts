import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  /* margin: auto 0.5rem; */
  width: 2rem;
  height: 2rem;

  > button {
    transition: 0.3s;
    width: 2rem;
    height: 2rem;
    border-radius: 5px;
    border: none;
    margin: 0 auto;
    padding: 0;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
    background: rgba(250, 50, 10);

    &:hover {
      box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.4);
    }
    > svg {
      max-height: 2rem;
      max-width: 2rem;
    }
  }
`;

export const SelectStatusContainer = styled.div`
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

export const HourInputContainer = styled.div`
  display: flex;
  align-items: center;

  > button {
    border-radius: 5px;
    box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.2);
    width: 2rem;
    width: 2rem;
    border: none;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--secondary-color);
  }
`;
