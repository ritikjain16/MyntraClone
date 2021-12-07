import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  gencol: String,
  catcol: String,
  brand_name: String,
  images: Array,
  original_price: Number,
  price: Number,
  product_main_text: String,
  sizes: Array,
  small_desc: String,
  time: { type: Date, default: Date.now() },
});

const ProductList = mongoose.model("Products", productSchema);

export default ProductList;
