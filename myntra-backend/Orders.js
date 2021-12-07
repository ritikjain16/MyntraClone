import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orders:Object,
  oid:String
});

const Orderlist = mongoose.model("Orders", orderSchema);

export default Orderlist;
