import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  uid:String,
  number:String,
  photoUrl:String,
  cart:Array,
  wishlist:Array,
  orders:Array,
  address:Array,
  coupons:Array,
//   address:Object
});

const Userlist = mongoose.model("Users", userSchema);

export default Userlist;
