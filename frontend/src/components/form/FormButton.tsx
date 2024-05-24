interface FormButtonProps {
  id: string;
  label: string;
  usedFor: string;
  checked: boolean;
  disabled: boolean;
  width?: string;
  handleChange: (id: string) => void;
  required?: boolean;
}
const FormButton = (props: FormButtonProps) => {
  const { label, width, usedFor, checked, disabled, required, handleChange } =
    props;

  const formChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    if (!disabled) handleChange(id);
  };

  return (
    <div
      className={`flex text-center ${width ? width : ""} m-2 rounded-md p-4 bg-grape shadow-md sm:max-w-md`}
    >
      <input
        id={usedFor}
        type="checkbox"
        onChange={formChange}
        checked={checked}
        name={usedFor}
        required={required}
        className="w flex-1 grow-0 border-0 mr-2 "
      />
      <label htmlFor={usedFor} className="text-sm p-1 font-semibold text-white">
        {label}
      </label>
    </div>
  );
};

export default FormButton;
