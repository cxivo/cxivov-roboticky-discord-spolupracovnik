import { Schema, model } from "mongoose";

const unumSchema = new Schema({
  url: { type: String, required: true },
});

module.exports = model("Unum", unumSchema);
