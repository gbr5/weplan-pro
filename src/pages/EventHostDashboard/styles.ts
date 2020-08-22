import styled from 'styled-components';
import '../../styles/global';

export const Container = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 5;

  width: 100%;
  padding: 16px 0;

  background: var(--header-background-color);
  box-shadow: var(--box-shadow);
`;

export const HeaderContent = styled.div`
  max-width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const Logo = styled.h2`
  color: var(--primary-color);
  font-size: 32px;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;

  > img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.1);
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: var(--letter-color-3);
    }

    a {
      text-decoration: none;
      color: var(--primary-color);
      transition: 0.2s;
    }

    a:hover {
      opacity: 0.7;
    }
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  button {
    background: transparent;
    border: 0;
    margin-left: 32px;
    font-size: 18px;
    font-weight: 500;
    color: var(--letter-color-1);

    svg {
      color: var(--letter-color-1);
      width: 30px;
      height: 30px;
    }
  }
`;

export const Content = styled.main`
  position: relative;
  width: 100%;
  display: grid;
  padding-right: 80px;
  grid-template-columns: 2fr 9fr;
  gap: 80px;
`;

export const SideBar = styled.div`
  background: var(--header-background-color);
  width: 100%;
  height: 100%;
  padding: 86px 16px 110px;
  display: flex;
  flex-direction: column;

  > h1 {
    margin-top: 32px;
    margin-bottom: 16px;
    margin-right: auto;
    font-size: 20px;
    color: var(--primary-color);
    opacity: 0.9;
  }

  > button {
    margin-right: auto;
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 16px;
    color: var(--letter-color-2);
    border: none;
    background: transparent;

    &:hover {
      opacity: 0.8;
    }
  }

  span {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 8px;

    > button {
      margin-top: 8px;
      margin-bottom: 8px;
      font-size: 16px;
      border: none;
      background: transparent;

      &:hover {
        opacity: 0.8;
      }
      h2 {
        font-size: 18px;
        color: var(--letter-color-3);
      }

      h3 {
        font-size: 18px;
        color: var(--letter-color-2);
      }
    }

    p {
      margin-right: auto;
      margin-top: 8px;
      margin-top: 4px;
      font-size: 16px;
      color: var(--letter-color-2);
    }
  }
`;

export const MyEvents = styled.button`
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  color: var(--primary-color);

  img {
    width: 176px;
    height: 176px;
    border-radius: 50%;
  }
`;

export const MyEventsDrawer = styled.div`
  top: 130px;
  left: 0px;
  z-index: 100;
  position: absolute;
  height: 300px;
  width: 500px;
  background-color: var(--card-color);
  opacity: 0.9;
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;
  &:hover {
    opacity: 0.95;
  }
  > span {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
    svg {
      margin-left: auto;
    }
  }
`;

export const MyEventsDrawerButton = styled.button`
  background: transparent;
  border: none;
  color: var(--primary-color);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;

  > h1 {
    font-size: 24px;
    color: var(--primary-color);

    &:hover {
      opacity: 0.6;
    }
    &::active {
      color: var(--title-color);
    }
  }
`;

export const EventInfoDrawer = styled.div`
  top: 140px;
  left: 230px;
  z-index: 100;
  position: absolute;
  height: 490px;
  width: 1020px;
  background-color: var(--card-color);
  /* opacity: 0.95; */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;

  button {
    width: 100%;
    margin-top: 16px;
    background: transparent;
    padding: 8px;
    border-radius: 8px;
    border: none;
    border: 1px solid var(--title-color);
    background-color: rgba(100, 100, 0, 0.2);

    > h3 {
      color: var(--primary-color);
      font-size: 16px;
    }

    &:hover {
      background-color: rgba(100, 100, 0, 0.4);
    }
    &:active {
      background-color: rgba(100, 100, 0, 0.6);
    }
  }

  div {
    display: flex;
    flex-direction: row;

    div {
      display: flex;
      flex-direction: column;

      > span {
        background-color: rgba(255, 144, 0, 0.05);
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: var(--letter-color-3);
        margin: 8px;
        border: 1px solid var(--primary-color);
        border-radius: 8px;
        padding: 16px;

        h2 {
          font-size: 16px;
          color: var(--title-color);
          margin-bottom: 8px;
          width: 200px;
        }

        input {
          padding: 0 8px;
          margin-left: auto;
          text-align: right;
          border: 1px solid var(--primary-color);
          border-radius: 4px;
          height: 32px;
          width: 252px;
          color: var(--title-color);
          font-weight: 500;
          background-color: rgba(255, 144, 0, 0.2);
        }

        &:hover {
          background-color: rgba(255, 144, 0, 0.15);
        }
      }
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 107px;
  right: 76px;
  background: transparent;
  border: none;

  > svg {
    color: red;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-bottom: 32px;
  gap: 32px;
`;

export const SubHeader = styled.div`
  margin: 60px auto 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: auto;
    font-size: 24px;
    color: var(--letter-color-3);
    margin-bottom: 16px;

    > button {
      background: transparent;
      border: none;
      margin-left: 32px;
      color: var(--title-color);
    }
  }
`;

export const EditEventNameDrawer = styled.div`
  top: 140px;
  left: 535px;
  z-index: 100;
  position: absolute;
  height: 178px;
  width: 400px;
  background-color: var(--card-color);
  opacity: 0.95;
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;

  > span {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;

    h2 {
      font-size: 16px;
      color: var(--title-color);
      margin-bottom: 8px;
    }

    input {
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      width: 300px;
      height: 32px;
    }

    button {
      margin-left: auto;
      margin-top: 16px;
      background: transparent;
      padding: 8px;
      border-radius: 8px;
      border: none;

      > h3 {
        color: var(--title-color);
        font-size: 16px;
      }

      &:hover {
        border: 1px solid var(--title-color);
      }
    }

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
  }
`;

export const EditEventNameCloseButton = styled.button`
  position: absolute;
  top: 115px;
  right: 391px;
  background: transparent;
  border: none;

  > svg {
    color: red;
  }
`;

export const FirstRow = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  gap: 80px;

  div {
    display: flex;
    width: 130px;
    height: 130px;
    border: 3px solid var(--primary-color);
    background: var(--header-background-color);
    border-radius: 50%;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 0.7;
    }

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;

      &:hover {
        opacity: 0.8;
      }

      h2 {
        font-size: 16px;
        color: var(--title-color);
        margin-bottom: 8px;
      }

      p {
        font-size: 16px;
        color: var(--letter-color-3);
      }
    }
  }
`;

export const BudgetDrawer = styled.div`
  top: 240px;
  left: 435px;
  z-index: 100;
  position: absolute;
  height: 178px;
  width: 300px;
  background-color: var(--card-color);
  opacity: 0.95;
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;

  > span {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;

    h2 {
      font-size: 16px;
      color: var(--title-color);
      margin-bottom: 8px;
    }

    input {
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      height: 32px;
    }

    button {
      margin-left: auto;
      margin-top: 16px;
      background: transparent;
      padding: 8px;
      border-radius: 8px;
      border: none;

      > h3 {
        color: var(--title-color);
        font-size: 16px;
      }

      &:hover {
        border: 1px solid var(--title-color);
      }
    }

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
  }
`;

export const BudgetCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  color: red;
`;

export const Appointments = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 32px;
`;

export const NextAppointment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
  }

  > div {
    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 10px 5px rgba(100, 50, 50, 0.3);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    > p {
      font-size: 16px;
      color: var(--letter-color-2);
    }

    > div {
      display: flex;
      align-items: flex-start;
      gap: 16px;

      > h1 {
        font-size: 18px;
        color: var(--title-color);
      }

      > span {
        font-size: 16px;
        color: var(--letter-color-1);
      }
    }
  }
`;

export const MyAppointments = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  position: relative;

  > button {
    right: 0;
    position: absolute;
    background: transparent;
    border: none;
    color: var(--title-color);
  }

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
  }

  > div {
    width: 100%;

    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const Appointment = styled.div`
  width: 100%;
  margin-bottom: 8px;

  > p {
    font-size: 16px;
    color: var(--letter-color-2);
  }

  > div {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 8px;

    > h1 {
      font-size: 18px;
      color: var(--title-color);
    }

    > span {
      margin-left: auto;
      font-size: 16px;
      color: var(--letter-color-1);
    }
  }
`;

export const AddAppointmentDrawer = styled.div`
  top: 140px;
  left: 380px;
  z-index: 100;
  position: absolute;
  height: 460px;
  width: 700px;
  background-color: var(--card-color);
  /* opacity: 0.95; */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 16px;

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
    margin-bottom: 16px;
  }

  button {
    width: 100%;
    margin-top: 16px;
    background: transparent;
    padding: 8px;
    border-radius: 8px;
    border: none;
    border: 1px solid var(--title-color);
    background-color: rgba(100, 100, 0, 0.2);

    > h3 {
      color: var(--primary-color);
      font-size: 16px;
    }

    &:hover {
      background-color: rgba(100, 100, 0, 0.4);
    }
    &:active {
      background-color: rgba(100, 100, 0, 0.6);
    }
  }

  > span {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;

    h2 {
      font-size: 16px;
      color: var(--title-color);
      margin-bottom: 8px;
      width: 300px;
    }

    input {
      padding: 0 8px;
      margin-left: auto;
      text-align: right;
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      height: 32px;
      width: 252px;
      color: var(--title-color);
      font-weight: 500;
      background-color: rgba(255, 144, 0, 0.18);

      &:active {
        background-color: rgba(255, 144, 0, 0.22);
      }
    }

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
  }
`;

export const AddAppointmentDrawerCloseButton = styled.button`
  position: absolute;
  top: 115px;
  right: 248px;
  background: transparent;
  border: none;

  > svg {
    color: red;
  }
`;

export const SupplierSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
`;

export const SelectedSuppliers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  position: relative;

  > button {
    background: transparent;
    border: none;
    position: absolute;
    right: 0;
    top: 0;
    color: var(--title-color);
  }

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
  }

  > div {
    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const HiredSuppliers = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  position: relative;

  > button {
    background: transparent;
    border: none;
    position: absolute;
    right: 0;
    top: 0;
    color: var(--title-color);
  }

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
  }

  > div {
    width: 100%;

    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const Supplier = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--letter-color-4);

  > h1 {
    font-size: 18px;
    color: var(--title-color);
  }

  > svg {
    margin-left: auto;
  }
`;

export const AddSupplierDrawer = styled.div`
  top: 140px;
  left: 435px;
  z-index: 100;
  position: absolute;
  height: 460px;
  width: 700px;
  background-color: var(--card-color);
  /* opacity: 0.95; */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 16px;

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
    margin-bottom: 16px;
  }

  button {
    width: 100%;
    margin-top: 16px;
    background: transparent;
    padding: 8px;
    border-radius: 8px;
    border: none;
    border: 1px solid var(--title-color);
    background-color: rgba(100, 100, 0, 0.2);

    > h3 {
      color: var(--primary-color);
      font-size: 16px;
    }

    &:hover {
      background-color: rgba(100, 100, 0, 0.4);
    }
    &:active {
      background-color: rgba(100, 100, 0, 0.6);
    }
  }

  > span {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;

    h2 {
      font-size: 16px;
      color: var(--title-color);
      margin-bottom: 8px;
      width: 300px;
    }

    input {
      padding: 0 8px;
      margin-left: auto;
      text-align: right;
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      height: 32px;
      width: 252px;
      color: var(--title-color);
      font-weight: 500;
      background-color: rgba(255, 144, 0, 0.2);
    }

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
  }
`;

export const AddSupplierDrawerCloseButton = styled.button`
  position: absolute;
  top: 115px;
  right: 191px;
  background: transparent;
  border: none;

  > svg {
    color: red;
  }
`;

export const GuestSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
`;

export const EventGuests = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
  }

  > div {
    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const MyGuests = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  position: relative;

  > button {
    background: transparent;
    border: none;
    position: absolute;
    right: 0;
    top: 0;
    color: var(--title-color);
  }

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
  }

  > div {
    width: 100%;

    padding: 16px;
    border-radius: 8px;
    background-color: var(--header-background-color);
    box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const Guest = styled.div`
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--letter-color-4);

  > h1 {
    font-size: 18px;
    color: var(--title-color);
  }

  > svg {
    margin-left: auto;
  }
`;

export const AddGuestDrawer = styled.div`
  top: 140px;
  left: 380px;
  z-index: 100;
  position: absolute;
  height: 460px;
  width: 700px;
  background-color: var(--card-color);
  opacity: 0.95;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 16px;

  > h1 {
    font-size: 24px;
    color: var(--primary-color);
    margin-bottom: 16px;
  }

  button {
    width: 100%;
    margin-top: 16px;
    background: transparent;
    padding: 8px;
    border-radius: 8px;
    border: none;
    border: 1px solid var(--title-color);
    background-color: rgba(100, 100, 0, 0.2);

    > h3 {
      color: var(--primary-color);
      font-size: 16px;
    }

    &:hover {
      background-color: rgba(100, 100, 0, 0.4);
    }
    &:active {
      background-color: rgba(100, 100, 0, 0.6);
    }
  }

  > span {
    background-color: rgba(255, 144, 0, 0.05);
    display: flex;
    justify-content: center;
    color: var(--letter-color-3);
    margin: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    padding: 16px;

    h2 {
      font-size: 16px;
      color: var(--title-color);
      margin-bottom: 8px;
      width: 300px;
    }

    input {
      padding: 0 8px;
      margin-left: auto;
      text-align: right;
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      height: 32px;
      width: 252px;
      color: var(--title-color);
      font-weight: 500;
      background-color: rgba(255, 144, 0, 0.2);
    }

    &:hover {
      background-color: rgba(255, 144, 0, 0.15);
    }
  }
`;

export const AddGuestDrawerCloseButton = styled.button`
  position: fixed;
  top: 115px;
  right: 265px;
  background: transparent;
  border: none;

  > svg {
    color: red;
  }
`;

export const CheckList = styled.section`
  height: 100%;
  background: var(--header-background-color);
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 1px 1px 5px 4px rgba(90, 90, 90, 0.02);

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--letter-color-4);
    display: block;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }

  li {
    list-style: none;
    padding: 0 8px 16px;
    display: flex;
    grid-template-columns: 4fr 16fr 1fr;
    align-items: center;
    border-bottom: 1px solid var(--letter-color-4);

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    span {
      margin-right: auto;
    }
  }

  li + li {
    margin-top: 16px;
  }
`;

export const Financial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  box-sizing: border-box;

  img {
    width: 100%;
    border-radius: 8px;
  }
`;

export const LatestNews = styled.div`
  background: var(--header-background-color);
  padding: 24px;
  border-radius: 8px;
  height: 300px;
  box-shadow: 2px 2px 3px 2px rgba(50, 50, 50, 0.1);
  flex: 1;
  align-items: center;

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--letter-color-4);
    display: block;
    margin-bottom: 12px;
    padding-bottom: 16px;
  }

  li {
    list-style: none;
    padding: 0 8px 12px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--letter-color-4);

    h3 {
      color: var(--title-color);
    }

    span {
      margin-left: 4px;
      color: var(--primary-color);
    }
    p {
      margin-right: auto;
      margin-left: 16px;
    }
  }

  li + li {
    margin-top: 16px;
  }
`;

export const Payments = styled.section`
  background: var(--header-background-color);
  width: 100%;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 1px 1px 5px 4px rgba(90, 90, 90, 0.02);

  > strong {
    color: var(--letter-color-2);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--letter-color-4);
    display: block;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }

  li {
    list-style: none;
    padding: 0 8px 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--letter-color-4);

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    span {
      margin-right: auto;
    }
  }

  li + li {
    margin-top: 16px;
  }
`;