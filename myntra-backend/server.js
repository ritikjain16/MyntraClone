import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Catlist from "./CatList.js";
import BigList from "./BigList.js";
import ProductList from "./Products.js";
import Userlist from "./Users.js";
import Orderlist from "./Orders.js";
import GenderList from "./Genlist.js";
import MainImage from "./mainimage.js";
// ---------------
import bodyParser from "body-parser";
import dotenv from "dotenv";
import paymentRoute from "./paymentRoutes.js";
// -----------------------
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
const conn_url = process.env.MONGOOSE_URL;

app.use(bodyParser.json()); // ------------
app.use(express.json());
app.use(cors());

mongoose
  .connect(conn_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(`no connection `));

// -----------------
app.use("/api", paymentRoute);

//   -------------- cat list------------------

app.get("/catlist", (req, res) => {
  Catlist.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
      //   console.log(data);
    }
  });
});

app.post("/catlist", (req, res) => {
  const cat = req.body;
  Catlist.create(cat, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// ---------------Main Image

app.post("/postmainimage", (req, res) => {
  const img = req.body;
  MainImage.create(img, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/getmainimage", (req, res) => {
  MainImage.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// ------------------big image list--------------

app.post("/getbiglist", (req, res) => {
  const { gencol } = req.body;
  BigList.find({ gencol }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
      //   console.log(data);
    }
  });
});

app.post("/biglist", (req, res) => {
  const cat = req.body;
  BigList.create(cat, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// ------------- search and gender details

app.get("/genlist", (req, res) => {
  GenderList.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
      //   console.log(data);
    }
  });
});

app.post("/getgenlist", (req, res) => {
  const { gencol } = req.body;
  GenderList.find({ gencol }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
      //   console.log(data);
    }
  });
});

app.post("/searches", (req, res) => {
  GenderList.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
      //   console.log(data);
    }
  });
});

app.post("/genlist", (req, res) => {
  const cat = req.body;
  GenderList.create(cat, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// -----------products

app.post("/products", (req, res) => {
  const cat = req.body;
  ProductList.create(cat, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/pd", (req, res) => {
  const { gencol, catcol } = req.body;

  ProductList.find({ gencol, catcol }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
      //   console.log(data);
    }
  });
});

app.post("/pdlth", async (req, res) => {
  const { gencol, catcol } = req.body;
  const lthprod = await ProductList.find({ gencol, catcol }).sort({
    price: -1,
  });
  res.status(200).send(lthprod);
});

app.post("/pdhtl", async (req, res) => {
  const { gencol, catcol } = req.body;
  const lthprod = await ProductList.find({ gencol, catcol }).sort({ price: 1 });
  res.status(200).send(lthprod);
});

app.post("/pdet", (req, res) => {
  const { _id, gencol, catcol } = req.body;

  ProductList.find({ _id, gencol, catcol }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
      //   console.log(data);
    }
  });
});

// ---------------------user---------------
app.post("/login", (req, res) => {
  const user = req.body;

  Userlist.findOne({ uid: user.uid }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // console.log(data);
      if (data == null) {
        // console.log("New User");
        Userlist.create(user, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send(data);
          }
        });
      } else {
        // console.log("Old User");
        res.status(200).send(data);
      }
    }
  });
});

app.post("/cart", (req, res) => {
  const { uid, cartItem } = req.body;

  Userlist.updateOne({ uid }, { $push: { cart: cartItem } }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Done");
      // console.log(data);
    }
  });
});

app.post("/removecart", (req, res) => {
  const { uid, cid } = req.body;

  Userlist.updateOne(
    { uid },
    { $pull: { cart: { cart_item_id: cid } } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("Done");
        // console.log(data);
      }
    }
  );
});

app.post("/movetowishlist", async (req, res) => {
  const { uid, cid, pid, witem } = req.body;

  const user = await Userlist.findOne({ uid });

  var allwitems = user.wishlist;

  var allpids = [];

  // console.log(allwitems);

  for (let i = 0; i < allwitems.length; i++) {
    allpids.push(allwitems[i].pid);
  }

  if (allpids.includes(pid)) {
    Userlist.updateOne(
      { uid },
      { $pull: { cart: { cart_item_id: cid } } },
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send("Done");
          // console.log(data);
        }
      }
    );
  } else {
    Userlist.updateOne({ uid }, { $push: { wishlist: witem } }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        Userlist.updateOne(
          { uid },
          { $pull: { cart: { cart_item_id: cid } } },
          (err, data) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).send("Done");
              // console.log(data);
            }
          }
        );
      }
    });
  }
});

app.post("/removewishlistitem", (req, res) => {
  const { uid, pid } = req.body;

  Userlist.updateOne(
    { uid },
    { $pull: { wishlist: { pid: pid } } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("Done");
        // console.log(data);
      }
    }
  );
});

app.post("/addorremovewishlist", async (req, res) => {
  const { uid, witem } = req.body;
  const user = await Userlist.findOne({ uid });

  var allwitems = user.wishlist;

  var allpids = [];

  // console.log(allwitems);

  for (let i = 0; i < allwitems.length; i++) {
    allpids.push(allwitems[i].pid);
  }

  if (allpids.includes(witem.pid)) {
    Userlist.updateOne(
      { uid },
      { $pull: { wishlist: { pid: witem.pid } } },
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send("Removed");
          // console.log(data);
        }
      }
    );
  } else {
    Userlist.updateOne({ uid }, { $push: { wishlist: witem } }, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("Added");
      }
    });
  }
});

app.post("/iswishlisted", async (req, res) => {
  const { uid, pid } = req.body;

  const user = await Userlist.findOne({ uid });

  var allwitems = user.wishlist;

  var allpids = [];

  // console.log(allwitems);

  for (let i = 0; i < allwitems.length; i++) {
    allpids.push(allwitems[i].pid);
  }
  if (allpids.includes(pid)) {
    res.status(200).send("Added");
  } else {
    res.status(200).send("Removed");
  }
});

app.post("/setaddress", (req, res) => {
  const { uid, addressitem } = req.body;
  Userlist.updateOne(
    { uid: uid },
    { $push: { address: addressitem } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("Done");
      }
    }
  );
});

app.post("/deleteaddress", (req, res) => {
  const { uid, address_id } = req.body;
  Userlist.updateOne(
    { uid: uid },
    { $pull: { address: {address_id} } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("Done");
      }
    }
  );
});

app.post("/placeOrder1", (req, res) => {
  const { uid, orderobj, oid } = req.body;
  orderobj["oid1"] = oid;
  Userlist.updateOne({ uid }, { $push: { orders: orderobj } }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // console.log("D1");
      Orderlist.create({ orders: orderobj, oid: oid }, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          // console.log("D2");
          Userlist.updateOne({ uid }, { $set: { cart: [] } }, (err, data) => {
            if (err) {
              res.status(500).send(err);
            } else {
              // console.log("D3");
              res.status(200).send("Done");
            }
          });
        }
      });
    }
  });
});

app.post("/cancelorder", (req, res) => {
  const { uid, orderID, order_status, expected_date } = req.body;

  Userlist.updateOne(
    { uid, "orders.orderID": orderID },
    {
      $set: {
        "orders.$.order_status": order_status,
        "orders.$.expected_date": expected_date,
      },
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        Orderlist.updateOne(
          { oid: orderID },
          {
            $set: {
              "orders.order_status": order_status,
              "orders.expected_date": expected_date,
            },
          },
          (err, data) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).send("Done");
              // console.log(data);
            }
          }
        );
      }
    }
  );
});

app.post("/getuserdetails", (req, res) => {
  const { uid } = req.body;
  Userlist.findOne({ uid }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
      // console.log(data);
    }
  });
});

app.post("/coupons", async (req, res) => {
  const { uid, couponText } = req.body;
  try {
    const data = await Userlist.updateOne({ uid }, { $set: { coupons: couponText } });
    res.status(200).send(data)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

app.post("/getkey", (req, res) => {
  res.status(200).send(process.env.KEY_ID);
});

app.listen(port, () => {
  console.log(`listen on ${port} port.`);
});
