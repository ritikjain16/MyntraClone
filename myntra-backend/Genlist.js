import mongoose from "mongoose";

const genSchema = mongoose.Schema({
  catcol: String,
  gencol: String,
  url: String,
});

const GenderList = mongoose.model("Gender", genSchema);

export default GenderList;
