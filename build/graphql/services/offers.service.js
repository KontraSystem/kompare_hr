"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offers = exports.OffersService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const offerSchema = new mongoose_1.default.Schema({
    _id: mongodb_1.ObjectId,
    name: String,
    type: String,
    value: Number,
    value_alt: Number,
    fixed_price: Boolean,
    condition: String,
    selected: Boolean,
    available: Boolean,
});
exports.OffersService = {
    selectOffer: async (id) => {
        const offer = await exports.Offers.findById(id).exec();
        if (offer?.selected != null) {
            offer.selected = !offer?.selected;
            await offer?.save();
        }
        return offer;
    },
    getOffers: async (filter) => {
        if (filter != null) {
            if (filter.type == "D")
                return ((await exports.Offers.find({ ...filter, type: { $in: ["S", "D"] } })) ?? []);
            return (await exports.Offers.find(filter)) ?? [];
        }
        return (await exports.Offers.find()) ?? [];
    },
    getSelectedCoverages: async () => await exports.Offers.find({ type: "C", available: true, selected: true }),
    getSelectedDiscounts: async () => await exports.Offers.find({ type: "D", available: true, selected: true }),
    enableOffer: async (filter) => {
        return await exports.Offers.findOneAndUpdate(filter, {
            available: true,
            selected: filter?.type == "S" ?? false,
        });
    },
    disableOffer: async (filter) => {
        return await exports.Offers.findOneAndUpdate(filter, {
            available: false,
            selected: false,
        });
    },
};
exports.Offers = mongoose_1.default.model("Offer", offerSchema);
//# sourceMappingURL=offers.service.js.map