import { useContext, useEffect } from "react";
import { GraphQLContext } from "@Context/GraphqlContext";
import FormController from "@Form/FormController";

const Sidebar = () => {
  const { coverages, toggleOffer } = useContext(
    GraphQLContext
  ) as GraphQLContext;

  return (
    <div className="bg-thistle h-screen w-1/5">
      <FormController
        title="Choose Coverage"
        fields={coverages.available.map((coverage: Offer) => ({
          label: coverage.name,
          _id: coverage._id,
          handleChange: toggleOffer,
          checked: coverage.selected,
          usedFor: coverage._id,
          width: "w-5/6",
        }))}
        saveButton={false}
        wrapperClassName="flex flex-col items-center"
      />
    </div>
  );
};

export default Sidebar;
