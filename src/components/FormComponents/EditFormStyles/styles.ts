import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

interface IButtonProps {
  color: string;
}

export const ButtonExample = styled.button<IButtonProps>`
  background: ${props => props.color};
  border-radius: 8px;
  width: 90%;
  height: 2rem;
`;
