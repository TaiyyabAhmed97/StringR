import mongoose from "mongoose";
import bcrypt from 'bcrypt-nodejs'

const Schema = mongoose.Schema;

let shop = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
});

// hash the password
shop.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
shop.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
export const Shop = mongoose.model("shop", shop);
