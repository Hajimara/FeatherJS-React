const mongoose = require("mongoose");

module.exports = function (app) {
  const Schema = mongoose.Schema;
  const userSchema = new Schema({
    username: { type: String, required: [true, "can't be blank"] },
    email: {
      type: String,
      index: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    password: {
      type: String,
      required: [true, "can't be blank"],
    },
    role: { type: [String], enum: ["super", "c", "r", "u", "d"] },
    image: {type: String, default:null},
    createdAt:{type:Date, default:Date.now},
  });
  const Model = mongoose.model('user',userSchema);
  return Model;
};
