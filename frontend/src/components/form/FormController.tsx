import { useState } from "react";
import FormInput from "@Form/FormInput";
import FormSelect from "@Form/FormSelect";
import FormButton from "@Form/FormButton";
import FormDate from "@Form/FormDate";
import BasicButton from "@Basic/BasicButton";

interface FormControllerProps {
  title?: string;
  fields: FormField[];
  saveButton?: boolean;
  handleSave: (accepted: boolean) => void;
  wrapperClassName: string;
}
const FormController = (props: FormControllerProps) => {
  const { fields, title, saveButton, wrapperClassName, handleSave } = props;
  const [helperText, setHelperText] = useState<{ [key: string]: boolean }>({});
  const generateFields = () => {
    return fields.map((field: FormField) => {
      if (field.dataOptions != (null || undefined)) {
        return (
          <FormSelect
            {...field}
            showHelperText={helperText[field.usedFor]}
            key={field.usedFor}
          />
        );
      } else if (field.checked != (null || undefined)) {
        return (
          <FormButton
            {...field}
            disabled={field.type == "S"}
            key={field.usedFor}
          />
        );
      } else {
        return field.usedFor == "birthdate" ? (
          <FormDate {...field} key={field.usedFor} />
        ) : (
          <FormInput
            {...field}
            showHelperText={helperText[field.usedFor]}
            key={field.usedFor}
          />
        );
      }
    });
  };

  const handleSubmit = () => {
    let accepted = true;
    let _helperText = helperText;
    fields.forEach((field: FormField) => {
      if (field.required) {
        if (
          String(field.value).length == 0 ||
          Number(field.value) == 0 ||
          field.value == undefined
        ) {
          _helperText = { ..._helperText, [field.usedFor]: true };
          accepted = false;
        } else {
          _helperText = { ..._helperText, [field.usedFor]: false };
        }
      }
    });
    setHelperText(_helperText);
    if (accepted) {
      handleSave(accepted);
    }
    console.log(helperText);
  };
  return (
    <>
      <form>
        <h1 className="text-3xl px-2 pt-2 ">{title}</h1>
        <div className={wrapperClassName}>{generateFields()}</div>
      </form>
      {saveButton ? <BasicButton onClick={handleSubmit} text="Save" /> : null}
    </>
  );
};

export default FormController;
