"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cities = exports.Offers = exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const userSchema = new mongoose_1.default.Schema({
    _id: mongodb_1.ObjectId,
    username: String,
    birthdate: Date,
    city: {
        _id: mongodb_1.ObjectId,
        option: String,
        value: Number,
        selected: Boolean
    },
    vehiclepower: Number,
    voucher: Number
});
const offerSchema = new mongoose_1.default.Schema({
    _id: mongodb_1.ObjectId,
    name: String,
    type: String,
    value: Number,
    value_alt: Number,
    fixed_price: Boolean,
    condition: String,
    selected: Boolean,
    available: Boolean
});
const citySchema = new mongoose_1.default.Schema({
    _id: mongodb_1.ObjectId,
    option: String,
    value: Number,
    selected: Boolean
});
exports.Users = mongoose_1.default.model('User', userSchema);
exports.Offers = mongoose_1.default.model('Offer', offerSchema);
exports.Cities = mongoose_1.default.model('City', citySchema);
//# sourceMappingURL=index.js.map