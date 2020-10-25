import styled from 'styled-components';

export const SideMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 30%;
  background: var(--background-color);
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 48px;

  button {
    padding-left: 16px;
    background: transparent;
    border: none;
    font-size: 20px;
    font-weight: 500;
    text-align: left;
    color: var(--letter-color-3);
  }
`;
