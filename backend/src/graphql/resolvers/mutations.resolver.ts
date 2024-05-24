import { ObjectId } from "mongodb";
import { CitiesService } from "../services/cities.service";
import { OffersService } from "../services/offers.service";
import { UsersService } from "../services/users.service";
export const Mutations = {
  selectOffer: async (_: never, args: { id: ObjectId }) => {
    return await OffersService.selectOffer(args.id);
  },
  enableOffer: async (_: never, args: OfferFilter) => {
    return await OffersService.enableOffer(args.filter);
  },
  disableOffer: async (_: never, args: OfferFilter) => {
    return await OffersService.disableOffer(args.filter);
  },

  insertUser: async (_: never, args: { user: User }) => {
    return await UsersService.insertUser(args.user);
  },
  updateUser: async (_: never, args: { user: User }) => {
    return await UsersService.updateUser(args.user);
  },
  insertCity: async (_: never, args: { option: string; value: number }) => {
    return await CitiesService.insertCity(args?.option, args?.value);
  },
  selectCity: async (_: never, args: { id: ObjectId }) => {
    return await CitiesService.updateCity(args.id);
  },
};
