"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.UsersService = exports.Condition = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
var Condition;
(function (Condition) {
    Condition["BASE_PRICE"] = "base_price";
    Condition["AGE"] = "age";
    Condition["GLASS"] = "glass_protection";
    Condition["ADVISER"] = "cvrg_min_all_cvrg";
    Condition["VIP"] = "total_high_power";
})(Condition || (exports.Condition = Condition = {}));
const userSchema = new mongoose_1.default.Schema({
    _id: mongodb_1.ObjectId,
    username: String,
    birthdate: Date,
    city: {
        _id: mongodb_1.ObjectId,
        option: String,
        value: Number,
        selected: Boolean,
    },
    vehiclepower: Number,
    voucher: Number,
});
exports.UsersService = {
    insertUser: async (user) => {
        user = {
            ...user,
            _id: new mongodb_1.ObjectId(),
        };
        return await exports.Users.create(user);
    },
    getUser: async () => {
        return await exports.Users.findOne();
    },
    updateUser: async (user) => {
        return await exports.Users.findOneAndUpdate({ _id: user._id }, user);
    },
};
exports.Users = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=users.service.js.map