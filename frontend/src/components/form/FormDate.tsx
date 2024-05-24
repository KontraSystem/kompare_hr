import React, { useRef, useState, useEffect } from "react";
import BasicCalendar from "@Basic/BasicCalendar";
interface FormDateProps {
  label: string;
  placeholder: string;
  usedFor: string;
  value: Date;
  required?: boolean;
  handleChange: (id: string, value: Date) => void;
}

const FormDate: React.FC<FormDateProps> = (props: FormDateProps) => {
  const { value, label, usedFor, required, handleChange } = props;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShow(false);
    }
  };
  useEffect(() => {
    if (value != (null || undefined)) {
      setSelectedDate(value);
    }
  }, [value]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    handleChange(usedFor, date);
  };

  const formChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    handleChange(id, value);
  };

  document.addEventListener("click", handleClickOutside, true);
  return (
    <div
      ref={ref}
      id="datepicker"
      className="mt-5 flex flex-1 space-x-5 text-color-babypowder items-center justify-between sm:grid-cols-6 relative"
    >
      <label htmlFor={usedFor} className="block text-sm font-medium">
        {label}
      </label>
      <input
        type="text"
        id={usedFor}
        value={selectedDate?.toLocaleDateString("hr-HR") ?? ""}
        onChange={formChange}
        onClick={() => setShow(!show)}
        className="flex-1 grow-0 w-64 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Select a date"
        required={required}
        readOnly
      />
      <div className="absolute flex items-center top-0 right-0 mt-3 pr-4">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <div
        className={`absolute top-10 left-10 mt-2 ml-2 z-10 ${show ? "block" : "hidden"} flex flex-1 bg-white rounded-lg shadow-lg`}
      >
        <BasicCalendar value={selectedDate} handleChange={handleDateSelect} />
      </div>
    </div>
  );
};

export default FormDate;
