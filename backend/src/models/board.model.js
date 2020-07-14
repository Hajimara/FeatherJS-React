const mongoose = require("mongoose");
var fs = require("fs");
var path = require("path");

module.exports = function (app) {
  const Schema = mongoose.Schema;
  const boardSchema = new Schema({
    title: { type: String, required: [true, "Title is required!"] },
    body: { type: String, required: [true, "Body is required!"] },
    author: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      username: String,
      email: String,
      image: { type: String, default: null },
    },
    views: { type: Number, default: 0 },
    category: { type: String },
    file: [
      {
        originalFileName: { type: String },
        serverFileName: { type: String },
        size: { type: Number },
        isDeleted: { type: Boolean, default: false },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  });

  boardSchema.methods.processDelete = function () {
    this.isDeleted = true;
    this.save();
  };

  boardSchema.methods.getFileStream = function () {
    var stream;
    var filePath = path.join(__dirname, "upload", this.serverFileName); // 5-1
    var fileExists = fs.existsSync(filePath);
    if (fileExists) {
      stream = fs.createReadStream(filePath);
    } else {
      this.processDelete();
    }
    return stream;
  };
  const Model = mongoose.model("board", boardSchema);

  return Model;
};
