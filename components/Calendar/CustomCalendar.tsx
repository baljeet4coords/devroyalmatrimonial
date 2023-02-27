import { Dispatch, SetStateAction } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CustomCalendarProps {
  onDateChange: Dispatch<SetStateAction<Date>>;
  date: Date;
  props?: any;
}
const CustomCalendar: React.FC<CustomCalendarProps> = ({
  onDateChange,
  date,
  ...props
}) => {
  return (
    <div>
      <Calendar {...props} onChange={onDateChange} value={date} />
    </div>
  );
};

export default CustomCalendar;
