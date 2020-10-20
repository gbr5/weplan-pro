import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 100%;
  width: 100%;
`;

export const SideMenu = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 80px;
  height: 650px;
  width: 100%;
  background: var(--background-color);

  button {
    padding-left: 8px;
    background: transparent;
    border: none;
    font-size: 24px;
    font-weight: 500;
    text-align: left;
  }
`;

export const WorkStation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 668px;
  width: 100%;
  background: var(--header-background-color);
`;

export const EmployeeSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
