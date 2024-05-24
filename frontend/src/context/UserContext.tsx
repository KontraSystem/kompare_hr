import React, { useState, useEffect } from "react";
export const UserContext = React.createContext<UserContext | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<User>({
    username: "",
    birthdate: new Date(),
    city: undefined,
    vehiclepower: 0,
    voucher: 0,
  });
  const [receipt, setReceipt] = useState<Receipt>({
    base_price: 0,
    coverages: [],
    discounts: [],
    surcharge: 0,
    total_price: 0,
    voucher: 0,
  });
  const [prevData, setPrevData] = useState<User>(data);

  useEffect(() => {
    if (data._id == null) {
      getUserData();
    }
    setPrevData(data);
  }, [data]);

  const setUserField = (
    id: string,
    value: string | number | boolean | Date
  ) => {
    if (id == "vehiclepower" || id == "voucher") value = Number(value);
    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const setUserData = (_user: User) => {
    setData(_user);
  };

  const getUserData = () => {};

  return (
    <UserContext.Provider
      value={{
        data,
        prevData,
        receipt,
        setUserField,
        setUserData,
        setReceipt,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
