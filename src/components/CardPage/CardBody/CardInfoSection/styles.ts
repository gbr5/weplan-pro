import styled from 'styled-components';
import '../../../../styles/global';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  gap: 5px;

  > button {
    position: absolute;
    top: 4px;
    right: 4px;
    background: transparent;
    border: none;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 5px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: stretch;
      width: 100%;
      gap: 5px;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        width: 100%;
        height: 32px;

        p {
          border-bottom: 1px solid var(--title-color);
          width: 100%;
        }

        strong {
          font-weight: 500;
          margin-right: 8px;
          border: none;
          width: 250px;
        }

        button {
          background: transparent;
          border: none;
          margin-left: auto;
          transition: 0.3s;
          border-radius: 2px;
          height: 32px;
          width: 32px;

          &:hover {
            background: var(--title-color);

            svg {
              color: var(--header-background-color);
            }
          }
        }
      }
    }
  }
`;
