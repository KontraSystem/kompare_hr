"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutations = void 0;
const cities_service_1 = require("../services/cities.service");
const offers_service_1 = require("../services/offers.service");
const users_service_1 = require("../services/users.service");
exports.Mutations = {
    selectOffer: async (_, args) => {
        return await offers_service_1.OffersService.selectOffer(args.id);
    },
    enableOffer: async (_, args) => {
        return await offers_service_1.OffersService.enableOffer(args.filter);
    },
    disableOffer: async (_, args) => {
        return await offers_service_1.OffersService.disableOffer(args.filter);
    },
    insertUser: async (_, args) => {
        return await users_service_1.UsersService.insertUser(args.user);
    },
    updateUser: async (_, args) => {
        return await users_service_1.UsersService.updateUser(args.user);
    },
    insertCity: async (_, args) => {
        return await cities_service_1.CitiesService.insertCity(args?.option, args?.value);
    },
    selectCity: async (_, args) => {
        return await cities_service_1.CitiesService.updateCity(args.id);
    },
};
//# sourceMappingURL=mutations.resolver.js.map