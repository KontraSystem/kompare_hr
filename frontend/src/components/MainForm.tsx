import { useContext, useEffect } from "react";
import BasicCard from "@Basic/BasicCard";
import FormController from "@Form/FormController";
import { GraphQLContext } from "@Context/GraphqlContext";
import { UserContext } from "@Context/UserContext";

const MainForm = () => {
  const { cities, selectCity, updateUserData, postUserData, resetReceipt } =
    useContext(GraphQLContext) as GraphQLContext;
  const { data, receipt, setUserField } = useContext(
    UserContext
  ) as UserContext;
  const handleSave = (accepted: boolean) => {
    if (accepted) {
      if (data._id == null) {
        postUserData();
      } else {
        updateUserData();
      }
    } else {
      resetReceipt();
    }
  };
  return (
    <div className="flex flex-col items-center bg-white shadow-md m-10 p-5 h-1/2 rounded-lg">
      <FormController
        title="User Data"
        fields={[
          {
            label: "Username",
            placeholder: "Batman",
            usedFor: "username",
            value: data.username,
            handleChange: setUserField,
            showHelperText: false,
            required: true,
          },
          {
            label: "Birth Date",
            placeholder: "13.03.2000",
            usedFor: "birthdate",
            value: data.birthdate,
            handleChange: setUserField,
            showHelperText: false,
            required: true,
          },
          {
            label: "City",
            dataOptions: cities ?? [],
            value: data?.city?.option,
            usedFor: "city",
            handleChange: (id: string, value: string) => selectCity(value),
            showHelperText: false,
            required: true,
          },
          {
            label: "Vehicle Power",
            type: "number",
            usedFor: "vehiclepower",
            value: data.vehiclepower,
            handleChange: setUserField,
            showHelperText: false,
            required: true,
          },
          {
            label: "Voucher",
            type: "number",
            rightLabel: "EUR",
            usedFor: "voucher",
            value: data.voucher,
            handleChange: setUserField,
          },
        ]}
        saveButton={true}
        handleSave={handleSave}
        wrapperClassName="flex flex-col flex-1 items-between"
      />
    </div>
  );
};

export default MainForm;
