import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Make sure you have this import to use the default datepicker styles.

interface Props {
  selectedDate: Date;
}

const years = Array.from({ length: 200 }, (_, i) => 1930 + i).filter(
  (year) => year <= new Date().getFullYear()
);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CustomDatePicker: React.FC<Props> = ({ selectedDate, onChange }) => {
  return (
    <DatePicker
      placeholderText="Date of Birth"
      renderCustomHeader={({ date, changeYear, changeMonth }) => (
        <div className="flex justify-center space-x-2 p-2">
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(Number(value))}
            className="border border-gray-300 rounded p-1"
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
            className="border border-gray-300 rounded p-1"
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
      selected={selectedDate}
      onChange={onChange}
      maxDate={new Date()}
      className="w-[38vh] border-none rounded-[8px] bg-[#F8F8F8] focus:ring-0 focus:outline-none min-h-[51px] "
    />
  );
};

export default CustomDatePicker;
