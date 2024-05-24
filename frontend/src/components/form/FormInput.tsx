import { useEffect, useState } from "react";
interface FormInputProps {
  label: string;
  type?: string;
  placeholder: string;
  rightLabel?: string;
  usedFor: string;
  value: string | number;
  showHelperText?: boolean;
  required?: boolean;
  handleChange: (id: string, value: string) => void;
}
const FormInput = (props: FormInputProps) => {
  const {
    value,
    label,
    type,
    placeholder,
    usedFor,
    showHelperText,
    rightLabel,
    handleChange,
  } = props;
  const [text, setText] = useState<string | number | undefined>(value);
  const formChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (type == "number") {
      if (!Number.isNaN(Number(value))) {
        setText(value);
        handleChange(id, value);
      }
    } else {
      setText(value);
      handleChange(id, value);
    }
  };

  useEffect(() => {
    setText(value);
  }, [value]);
  console.log(showHelperText);
  return (
    <>
      <div className="relative mt-5 flex space-x-2 text-color-babypowder items-center justify-between sm:grid-cols-6">
        <label htmlFor={usedFor} className="block text-sm font-medium">
          {label}
        </label>
        <div className="flex flex-col">
          <input
            type="text"
            onChange={formChange}
            value={text}
            name={usedFor}
            id={usedFor}
            className="flex-1 grow-0 w-64 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={placeholder}
          />
          {showHelperText ? (
            <div className="text-xs ml-2 text-red-500">
              This field is required.
            </div>
          ) : null}
        </div>
        {rightLabel ? (
          <div className="absolute flex items-center top-0 right-0 mt-3 pr-4 text-sm font-medium">
            {rightLabel}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default FormInput;
