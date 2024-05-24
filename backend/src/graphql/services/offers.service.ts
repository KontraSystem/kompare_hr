import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const offerSchema = new mongoose.Schema({
  _id: ObjectId,
  name: String,
  type: String,
  value: Number,
  value_alt: Number,
  fixed_price: Boolean,
  condition: String,
  selected: Boolean,
  available: Boolean,
});

export const OffersService = {
  selectOffer: async (id: ObjectId) => {
    const offer = await Offers.findById(id).exec();
    if (offer?.selected != null) {
      offer.selected = !offer?.selected;
      await offer?.save();
    }
    return offer;
  },
  getOffers: async (filter: Offer) => {
    if (filter != null) {
      if (filter.type == "D")
        return (
          (await Offers.find({ ...filter, type: { $in: ["S", "D"] } })) ?? []
        );
      return (await Offers.find(filter)) ?? [];
    }
    return (await Offers.find()) ?? [];
  },
  getSelectedCoverages: async () =>
    await Offers.find({ type: "C", available: true, selected: true }),
  getSelectedDiscounts: async () =>
    await Offers.find({ type: "D", available: true, selected: true }),
  enableOffer: async (filter: Offer) => {
    return await Offers.findOneAndUpdate(filter, {
      available: true,
      selected: filter?.type == "S" ?? false,
    });
  },
  disableOffer: async (filter: Offer) => {
    return await Offers.findOneAndUpdate(filter, {
      available: false,
      selected: false,
    });
  },
};

export const Offers = mongoose.model("Offer", offerSchema);
