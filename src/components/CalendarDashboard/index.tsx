import React, { useCallback, useState } from 'react';
// import { isToday, format, parseISO, isAfter } from 'date-fns';
// import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Calendar } from './styles';

const DashboardCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if ((modifiers.available, !modifiers.disabled)) {
      setSelectedDate(day);
    }
  }, []);

  return (
    <Calendar>
      <DayPicker
        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
        // fromMonth={new Date()}
        modifiers={{
          available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] },
        }}
        selectedDays={selectedDate}
        onDayClick={handleDateChange}
        months={[
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ]}
      />
    </Calendar>
  );
};

export default DashboardCalendar;
