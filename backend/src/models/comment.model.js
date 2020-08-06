const mongoose = require("mongoose");

module.exports = function (app) {
  const Schema = mongoose.Schema;
  const commentSchema = new Schema({
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
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
    parentComment: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "comment" },
      hasComment: { type: String, enum: ["no", "yes"], default: "no" },
    },
    text: { type: String, required: [true, "text is required!"] },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  }, {
    versionKey: false 
  });

  const Model = mongoose.model("comment", commentSchema);

  return Model;
};
