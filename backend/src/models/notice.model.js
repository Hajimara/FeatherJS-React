const mongoose = require("mongoose");

module.exports = function (app) {
  const Schema = mongoose.Schema;
  const noticeSchema = new Schema({
    author: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      username: { type: String, required: [true, "username is required!"] },
      email: { type: String, required: [true, "email is required!"] },
      image: { type: String, default: null },
    },
    text: { type: String, required: [true, "text is required!"] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  }, {
    versionKey: false 
  });

  const Model = mongoose.model("notice", noticeSchema);

  return Model;
};
