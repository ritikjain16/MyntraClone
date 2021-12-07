import mongoose from "mongoose";

const mainchema = mongoose.Schema({
img_url:String
})

const MainImage = mongoose.model("Main", mainchema)

export default MainImage
