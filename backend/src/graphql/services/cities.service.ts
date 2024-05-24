import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const citySchema = new mongoose.Schema({
  _id: ObjectId,
  option: String,
  value: Number,
  selected: Boolean,
});

export const CitiesService = {
  getCities: async () => (await Cities.find()) ?? [],
  insertCity: async (option: string, value: number) =>
    await Cities.create([
      { _id: new ObjectId(), option: option, value: value, selected: false },
    ]),
  updateCity: async (id: ObjectId) => {
    const city = await Cities.findById({ _id: id }).exec();
    if (city != null) {
      await Cities.updateMany({ selected: true }, { selected: false })
        .exec()
        .then(() => {
          city.selected = true;
          return city?.save();
        });
      return city;
    }
  },
};

export const Cities = mongoose.model("City", citySchema);
