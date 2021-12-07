import mongoose from "mongoose";

const bigschema = mongoose.Schema({
  catcol: String,
  gencol: String,
  img_url: String,
});

const BigList = mongoose.model("Big", bigschema);

export default BigList;
