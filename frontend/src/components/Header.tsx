import { useContext, useEffect } from "react";
import LogoHeader from "./LogoHeader";
import BasicLabel from "@Basic/BasicLabel";
import FormController from "@Form/FormController";
import { GraphQLContext } from "@Context/GraphqlContext";
import { UserContext } from "@Context/UserContext";

const Header = () => {
  const { discounts, toggleOffer } = useContext(
    GraphQLContext
  ) as GraphQLContext;
  const { receipt } = useContext(UserContext) as UserContext;
  return (
    <>
      <LogoHeader />
      <div className="w h-25 bg-sunset flex justify-between items-center ">
        <FormController
          title="Choose Discounts"
          fields={discounts.available.map((discount: Offer) => ({
            label: discount.name,
            _id: discount._id,
            handleChange: toggleOffer,
            checked: discount.selected,
            type: discount.type,
            usedFor: discount._id,
            disabled: discount.type == "S",
          }))}
          saveButton={false}
          wrapperClassName="flex ms-4"
        />
        <BasicLabel
          text={"Total Price: " + receipt.total_price.toFixed(2) + " €"}
        />
      </div>
    </>
  );
};

export default Header;
