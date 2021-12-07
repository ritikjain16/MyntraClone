import dotenv from "dotenv";
import uniqid from "uniqid";
import Razorpay from "razorpay";
import formidable from "formidable";
import crypto from "crypto";
import path from "path";
import Orderlist from "./Orders.js";
import Userlist from "./Users.js";
import request from "request";
dotenv.config();

let orderId;
var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
  //   headers: { "X-Razorpay-Account": "" },
});

let uid1, orderobj1, oid1;

export const createOrder = (req, res) => {
  const { amount1, uid, orderobj, oid } = req.body;
  // console.log(req.body);
  uid1 = uid;
  orderobj1 = orderobj;
  oid1 = oid;
  var options = {
    amount: amount1, // amount in the smallest currency unit
    currency: "INR",
    receipt: uniqid(),
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    orderId = order.id;
    res.json(order);
  });
};

export const paymentCallback = (req, res) => {
  // console.log(uid1);
  // console.log(orderobj1);
  // console.log(oid1);

  const form = formidable();
  form.parse(req, (err, fields, files) => {
    // console.log(fields);
    if (fields) {
      {
        const hash = crypto
          .createHmac("sha256", process.env.KEY_SECRET)
          .update(orderId + "|" + fields.razorpay_payment_id)
          .digest("hex");

        // console.log("hash", hash);

        // if (fields.razorpay_signature === hash) {
        //store in db
        const info = {
          _id: fields.razorpay_payment_id,
          orders: fields,
        };

        orderobj1["oid1"] = fields.razorpay_payment_id;
        orderobj1["orderID"] = fields.razorpay_order_id;
        orderobj1["razorpay_payment_id"] = fields.razorpay_payment_id;
        orderobj1["razorpay_order_id"] = fields.razorpay_order_id;
        orderobj1["razorpay_signature"] = fields.razorpay_signature;

        Userlist.updateOne(
          { uid: uid1 },
          { $push: { orders: orderobj1 } },
          (err, data) => {
            if (err) {
              res.status(500).send(err);
            } else {
              // console.log("D1");
              Orderlist.create(
                { orders: orderobj1, oid: fields.razorpay_payment_id },
                (err, data) => {
                  if (err) {
                    res.status(500).send(err);
                  } else {
                    // console.log("D2");
                    Userlist.updateOne(
                      { uid: uid1 },
                      { $set: { cart: [] } },
                      (err, data) => {
                        if (err) {
                          res.status(500).send(err);
                        } else {
                          // console.log("D3");
                          // res.status(200).send("Done");
                          res.redirect(`${process.env.FRONTEND}/orders`);
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );

        // const order = new OrderSchema({ _id: info._id, orders: info.orders });

        // order.save((err, data) => {
        //   if (err) {
        //     res.status(400).json({
        //       error: "Not able to save in db",
        //     });
        //   } else {
        //     res.redirect(
        //       `${process.env.FRONTEND}/payment/status/${fields.razorpay_payment_id}`
        //     );
        //   }
        // });

        // } else {
        //   res.send("ERROR");
        // }
      }
    }
  });
};

// export const getLogo = (req, res) => {
//   res.sendFile(path.join(__dirname, "rj.jpg"));
// };

export const getPayment = (req, res) => {
  OrderSchema.findById(req.params.paymentID).exec((err, data) => {
    if (err || data == null) {
      return res.json({
        error: "No data found",
      });
    } else {
      request(
        `https://${process.env.KEY_ID}:${process.env.KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentID}`,
        function (error, response, body) {
          // console.log("Response:", body);
          if (body) {
            const result = JSON.parse(body);
            res.status(200).json(result);
          }
        }
      );
    }
  });
};
