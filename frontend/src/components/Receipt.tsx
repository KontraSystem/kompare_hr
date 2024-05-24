import React, { useContext } from "react";
import { UserContext } from "@Context/UserContext";

const Receipt = () => {
  const { receipt } = useContext(UserContext) as UserContext;
  if (receipt == null) return;

  const { base_price, coverages, discounts, surcharge, total_price, voucher } =
    receipt;

  return (
    <div className="w-1/2 bg-white shadow-md mt-10 p-5 h-1/2  rounded-lg">
      <h2 className="text-lg font-bold mb-2">Receipt</h2>
      <div className="flex flex-col items-between  text-md list-disc ml-6">
        <div className="flex justify-between mb-5">
          <span className="font-semibold">Base Price:</span>
          <span>{base_price.toFixed(2)}€</span>
        </div>
        {coverages.length > 0 ? (
          <span className="font-semibold border-b-2 border-grape">
            Coverages
          </span>
        ) : null}
        {coverages.map(
          (coverage: { id: string; value: string; description: string }) => (
            <div key={"div-" + coverage.id} className="flex justify-between">
              <span
                key={"description-" + coverage.description}
                className="font-semibold"
              >
                {coverage.description}
              </span>
              <span key={"value-" + coverage.value}>
                +{coverage.value.toFixed(2)}€
              </span>
            </div>
          )
        )}
        {coverages.length > 0 ? (
          <div className="flex justify-between border-t-2 border-grape">
            <span className="font-semibold">Coverage Total:</span>
            <span>
              {"+" +
                coverages
                  .map(
                    (coverage: {
                      id: string;
                      value: string;
                      description: string;
                    }) => Number(coverage.value)
                  )
                  .reduce((a: number, b: number) => a + b, 0)
                  .toFixed(2)}
              €{" "}
            </span>
          </div>
        ) : null}
        {discounts.length > 0 ? (
          <span className="font-semibold border-b-2 border-grape">
            Discounts
          </span>
        ) : null}
        {discounts.map(
          (discount: { id: string; value: string; description: string }) => (
            <div key={"div-" + discount.id} className="flex justify-between">
              <span
                key={"description-" + discount.description}
                className="font-semibold"
              >
                {discount.description}
              </span>
              <span key={"value-" + discount.value}>
                -{discount.value.toFixed(2)}€
              </span>
            </div>
          )
        )}
        {discounts.filter(
          (discount: { id: string; value: string; description: string }) =>
            discount.id != "high_power-surcharge"
        ).length > 0 ? (
          <div className="flex justify-between border-t-2 border-grape">
            <span className="font-semibold">Discount Total:</span>
            <span>
              {"-" +
                discounts
                  .map(
                    (coverage: {
                      id: string;
                      value: string;
                      description: string;
                    }) => Number(coverage.value)
                  )
                  .reduce((a: number, b: number) => a + b, 0)
                  .toFixed(2)}
              €{" "}
            </span>
          </div>
        ) : null}
        {surcharge ? (
          <div className="flex justify-between">
            <span className="font-semibold">
              Surcharge for High Vehicle Power:
            </span>
            <span>+{surcharge.toFixed(2)}€</span>
          </div>
        ) : null}
        {voucher ? (
          <div className="flex justify-between">
            <span className="font-semibold">Voucher:</span>
            <span>{voucher.toFixed(2)}€</span>
          </div>
        ) : null}
        <div className="flex justify-between border-t-2 border-grape">
          <span className="font-semibold">Total Price:</span>
          <span>{total_price.toFixed(2)}€</span>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
