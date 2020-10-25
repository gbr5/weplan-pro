import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const MiddlePage = styled.div`
  display: flex;
  margin: 96px auto 32px;
  width: 100%;
  flex-direction: column;
  justify-content: stretch;
  height: 400px;
`;

export const SideMenuButton = styled.button`
  background: transparent;
  border: none;
  position: fixed;
  top: 120px;
  left: 32px;
  z-index: 10;
`;
