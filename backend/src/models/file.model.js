const mongoose = require("mongoose");

module.exports = function (app) {
  const Schema = mongoose.Schema;
  const fileSchema = new Schema({
    originalFileName: { type: String },
    serverFileName: { type: String },
    size: { type: Number },
    uploadedBy: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      username: { type: String },
      email: { type: String },
    },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "board" },
    isDeleted: { type: Boolean, default: false },
  }, {
    versionKey: false 
  });
  const Model = mongoose.model("file", fileSchema);
  return Model;
};
