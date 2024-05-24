import { useEffect, useState } from "react";

interface FormSelectProps {
  label?: string;
  value: string;
  usedFor: string;
  required?: boolean;
  showHelperText?: boolean;
  dataOptions: {
    _id: string;
    option: string;
    value?: float;
    selected?: boolean;
  }[];
  handleChange: (id: string, value: string | number) => void;
}

const FormSelect = (props: FormSelectProps) => {
  const {
    value,
    label,
    usedFor,
    required,
    showHelperText,
    dataOptions,
    handleChange,
  } = props;
  const [select, setSelect] = useState(value);
  const formChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target;
    const index = options.selectedIndex;
    const id = options[index].id;
    setSelect(options[index].value);
    handleChange(usedFor, id);
  };

  useEffect(() => {
    if (select != value) setSelect(value);
  }, [value]);

  return (
    <div className="mt-5 flex flex-1 space-x-5 text-color-babypowder items-center justify-between sm:grid-cols-6">
      {label ? (
        <label htmlFor={usedFor} className="block text-sm font-medium ">
          {label}
        </label>
      ) : null}
      <div className="flex flex-col">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
          <select
            onChange={formChange}
            value={select}
            id={usedFor}
            name={usedFor}
            required={required}
            className="block w flex-auto border-0 bg-transparent py-1.5 pl-1"
          >
            <option id={""} key={"empty"} value={""}></option>
            {dataOptions.map((option) => (
              <option id={option._id} key={option._id} value={option.option}>
                {option.option}
              </option>
            ))}
          </select>
        </div>
        {showHelperText ? (
          <div className="text-xs ml-2 text-red-500">
            This field is required.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FormSelect;
