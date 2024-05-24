import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export enum Condition {
  BASE_PRICE = "base_price",
  AGE = "age",
  GLASS = "glass_protection",
  ADVISER = "cvrg_min_all_cvrg",
  VIP = "total_high_power",
}

const userSchema = new mongoose.Schema({
  _id: ObjectId,
  username: String,
  birthdate: Date,
  city: {
    _id: ObjectId,
    option: String,
    value: Number,
    selected: Boolean,
  },
  vehiclepower: Number,
  voucher: Number,
});

export const UsersService = {
  insertUser: async (user: User) => {
    user = {
      ...user,
      _id: new ObjectId(),
    };
    return await Users.create(user);
  },
  getUser: async () => {
    return await Users.findOne();
  },
  updateUser: async (user: User) => {
    return await Users.findOneAndUpdate({ _id: user._id }, user);
  },
};

export const Users = mongoose.model("User", userSchema);
