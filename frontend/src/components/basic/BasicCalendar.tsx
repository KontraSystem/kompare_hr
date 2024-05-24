import React, { useState, useEffect, useContext } from "react";
import FormSelect from "@Form/FormSelect";
interface CalendarProps {
  id?: string;
  label?: string;
  value: Date;
  handleChange: (date: Date) => void;
}

const months = [
  { _id: 0, option: "January" },
  { _id: 1, option: "February" },
  { _id: 2, option: "March" },
  { _id: 3, option: "April" },
  { _id: 4, option: "May" },
  { _id: 5, option: "June" },
  { _id: 6, option: "July" },
  { _id: 7, option: "August" },
  { _id: 8, option: "September" },
  { _id: 9, option: "October" },
  { _id: 10, option: "November" },
  { _id: 11, option: "December" },
];
const BasicCalendar = (props: CalendarProps) => {
  const { value, id, handleChange } = props;

  const [show, setShow] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState<JSX.Element[] | undefined>(undefined);

  useEffect(() => {
    setCurrentDate(value);
  }, [value]);

  useEffect(() => {
    if (currentDate != null) {
      const _days = generateDays();
      setMonth(currentDate.getMonth());
      setYear(currentDate.getFullYear());
      if (_days != (null || undefined)) {
        setDays(_days);
      }
    }
  }, [currentDate]);

  const handleDateSelect = (date: Date) => {
    handleChange(date);
  };

  const handleYear = (_year: string) => {
    const year = Number(_year);
    if (year < new Date().getFullYear()) {
      const newDate: Date = new Date(
        year,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      setYear(year);
      handleDateSelect(newDate);
    }
  };

  const handleMonth = (value: number) => {
    const month = Number(value);
    const newDate: Date = new Date(
      currentDate.getFullYear(),
      month,
      currentDate.getDate()
    );
    setMonth(value);
    handleDateSelect(newDate);
  };

  const generateDays = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysToAdd = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const days = [];

    for (let i = 0; i <= daysInMonth; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const dayOfWeek = date.toLocaleString("default", { weekday: "short" });
      const dayOfMonth = date.getDate();
      const isCurrentDate = date.getDate() === new Date().getDate();
      const isSelectedDate = date.getDate() === currentDate?.getDate();

      if (dayOfWeek !== "Sun" && dayOfMonth === 1) {
        days.push(
          ...Array.from({ length: daysToAdd }, (_, j) => (
            <div key={j + "-empty"} className="py-2"></div>
          ))
        );
      }

      if (date.getMonth() !== currentDate.getMonth()) {
        days.push(<div key={i + "-next-month"} className="py-2"></div>);
      } else {
        days.push(
          <div
            key={i + "-" + date.getMonth()}
            className={`py-2 flex align-center justify-center border ${
              isCurrentDate ? "bg-gray-100" : ""
            } ${isSelectedDate ? "bg-grape text-white" : ""}`}
            onClick={() => handleDateSelect(date)}
          >
            {dayOfMonth}
          </div>
        );
      }
    }

    return days;
  };

  return (
    <div id="basic_calendar" className="p-2">
      <div className={"flex flex-1 items-center font-bold text-lg px-4"}>
        <FormSelect
          usedFor={"yearPicker"}
          value={year}
          placeholder={"Year"}
          handleChange={(id: string, value: number) => handleYear(value)}
          dataOptions={Array.from({ length: 100 }, (_, i) => {
            const _year = new Date().getFullYear() - i;
            return {
              _id: _year,
              option: _year,
            };
          })}
        />
        <FormSelect
          usedFor={"monthPicker"}
          value={currentDate?.toLocaleString("default", { month: "long" })}
          placeholder={"Month"}
          handleChange={(id: string, value: number) => handleMonth(value)}
          dataOptions={months}
        />
      </div>
      <div className="grid grid-cols-7 text-center">
        <div className="py-2">Sun</div>
        <div className="py-2">Mon</div>
        <div className="py-2">Tue</div>
        <div className="py-2">Wed</div>
        <div className="py-2">Thu</div>
        <div className="py-2">Fri</div>
        <div className="py-2">Sat</div>
      </div>
      <div className="grid grid-cols-7">{days}</div>
    </div>
  );
};

export default BasicCalendar;
