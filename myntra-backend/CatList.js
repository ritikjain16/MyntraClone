import mongoose from "mongoose";

const catschema = mongoose.Schema({
cat_name:String,
img_url:String
})

const Catlist = mongoose.model("Cats", catschema)

export default Catlist
