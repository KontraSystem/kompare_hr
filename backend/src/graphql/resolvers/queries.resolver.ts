import { reduceObjectArray } from "../../utils/helper";
import { CitiesService } from "../services/cities.service";
import { OffersService } from "../services/offers.service";
import { UsersService, Condition } from "../services/users.service";

export const Queries = {
  getUser: () => UsersService.getUser(),
  allCities: () => CitiesService.getCities(),
  allOffers: (_: never, args: OfferFilter) =>
    OffersService.getOffers(args.filter),
  calculatePrice: async (_: never, args: ReceiptInput) => {
    const receipt: Receipt = {
      base_price: 0,
      coverages: [],
      discounts: [],
      voucher: 0,
      surcharge: 0,
      total_price: 0,
    };
    // if (args.user == null) return receipt
    const user = args.user;
    receipt.voucher = user.voucher;
    const currentDate = new Date();
    const birthDate = new Date(user.birthdate);
    const age =
      currentDate.getFullYear() - birthDate.getFullYear() ??
      currentDate.getFullYear();
    receipt.base_price = user.city.value + (30 * age) / 60;
    receipt.total_price = receipt.base_price;

    receipt.coverages = args.coverages.map((coverage: Offer) => {
      if (coverage.value != null) {
        switch (coverage.condition) {
          case Condition.BASE_PRICE:
            return {
              id: coverage.condition,
              value: (receipt.base_price * coverage.value) / 100,
              description: coverage?.name + " - 20% of base price",
            };
          case Condition.AGE:
            if (age >= 30) {
              return {
                id: coverage.condition,
                value: coverage.value,
                description: coverage.name + " - 30 years or older",
              };
            } else {
              return {
                id: coverage.condition,
                value: coverage.value_alt ?? 0,
                description: coverage.name + " - younger than 30",
              };
            }
          case Condition.GLASS:
            return {
              id: coverage?.condition,
              value: (args?.user?.vehiclepower * coverage.value) / 100,
              description: coverage?.name + " - 80% of vehicle power",
            };
        }
      }
      return { id: coverage?.condition, value: 0, description: "" };
    });

    receipt.discounts = args?.discounts
      .filter((discount: Offer) => discount?.selected && discount?.type == "D")
      .map((discount: Offer) => {
        if (discount?.value != null) {
          switch (discount?.condition) {
            case Condition.BASE_PRICE:
              return {
                id: discount?.condition,
                value: (receipt.base_price * discount.value) / 100,
                description: discount?.name + " - 10% of base price",
              };
            case Condition.ADVISER:
              return {
                id: discount?.condition,
                value: receipt?.coverages
                  ? (reduceObjectArray(receipt.coverages) * discount.value) /
                    100
                  : 0,
                description: discount?.name + " - 20% of total price",
              };
            case Condition.VIP:
              return {
                id: discount?.condition,
                value: (receipt.total_price * discount.value) / 100,
                description: discount?.name + " - 10% of total price",
              };
          }
        }
        return { id: discount?.condition, value: 0, description: "" };
      });

    receipt.total_price +=
      receipt.coverages.length > 0 ? reduceObjectArray(receipt.coverages) : 0;
    receipt.total_price -=
      receipt.discounts.length > 0 ? reduceObjectArray(receipt.discounts) : 0;
    receipt.surcharge =
      (receipt.total_price *
        (args?.discounts.filter(
          (discount: Offer) => discount?.condition == "high_power_surcharge"
        )[0]?.value ?? 0)) /
      100;

    receipt.total_price += receipt.surcharge;
    receipt.total_price -= receipt.voucher;
    return receipt;
  },
};
