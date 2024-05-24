"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cities = exports.CitiesService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const citySchema = new mongoose_1.default.Schema({
    _id: mongodb_1.ObjectId,
    option: String,
    value: Number,
    selected: Boolean,
});
exports.CitiesService = {
    getCities: async () => (await exports.Cities.find()) ?? [],
    insertCity: async (option, value) => await exports.Cities.create([
        { _id: new mongodb_1.ObjectId(), option: option, value: value, selected: false },
    ]),
    updateCity: async (id) => {
        const city = await exports.Cities.findById({ _id: id }).exec();
        if (city != null) {
            await exports.Cities.updateMany({ selected: true }, { selected: false })
                .exec()
                .then(() => {
                city.selected = true;
                return city?.save();
            });
            return city;
        }
    },
};
exports.Cities = mongoose_1.default.model("City", citySchema);
//# sourceMappingURL=cities.service.js.map