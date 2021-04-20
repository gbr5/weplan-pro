import styled from 'styled-components';
import { shade } from 'polished';
import '../../styles/global';

export const Calendar = styled.aside`
  width: 50%;
  .DayPicker {
    background: var(--background-color);
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker {
    width: 100%;
  }
  .DayPicker-Month {
    width: 90%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: var(--letter-color-4);
    border-radius: 10px;
    color: var(--letter-color-1);
    /* box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.15); */

    &:hover {
      box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.25);
    }
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: var(--secondary-color) !important;
    border-radius: 10px;
    color: var(--letter-color-5) !important;
    font-weight: 500;
    border-bottom: 1px solid var(--letter-color-4);
    box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.3);
  }
`;
