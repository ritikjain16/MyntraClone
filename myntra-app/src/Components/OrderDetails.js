import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import firebase from "../firebaseconn";
import { Divider, LinearProgress } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import axios from "./axios";
const OrderDetails = (props) => {
  const location = useLocation();
  //   console.log(location.state);
  const [allItems, setallItems] = useState([]);
  const [oppro, setoppro] = useState(0);
  const [pspro, setpspro] = useState(0);
  const [sdpro, setsdpro] = useState(0);
  const [orrightcol, setorrightcol] = useState("#b6bce2");
  const [parightcol, setparightcol] = useState("#b6bce2");
  const [shrightcol, setshrightcol] = useState("#b6bce2");
  const [delrightcol, setdelrightcol] = useState("#b6bce2");
  const [ordispaly, setordispaly] = useState("none");
  const [padispaly, setpadispaly] = useState("none");
  const [shdispaly, setshdispaly] = useState("none");
  const [dedispaly, setdedispaly] = useState("none");

  const settracking = () => {
    // props.changeprogress(75);
    if (location.state.order_status === "Ordered") {
      setordispaly("block");
      setorrightcol("#3f51b5");
      setoppro(50);
    } else if (location.state.order_status === "Packed") {
      setordispaly("block");
      setorrightcol("#3f51b5");
      setoppro(100);
      setpadispaly("block");
      setparightcol("#3f51b5");
      setpspro(50);
    } else if (location.state.order_status === "Shipped") {
      setordispaly("block");
      setorrightcol("#3f51b5");
      setoppro(100);
      setpadispaly("block");
      setparightcol("#3f51b5");
      setpspro(100);
      setshdispaly("block");
      setshrightcol("#3f51b5");
      setsdpro(50);
    } else if (location.state.order_status === "Delivered") {
      setordispaly("block");
      setorrightcol("#3f51b5");
      setoppro(100);
      setpadispaly("block");
      setparightcol("#3f51b5");
      setpspro(100);
      setshdispaly("block");
      setshrightcol("#3f51b5");
      setsdpro(50);
      setdedispaly("block");
      setdelrightcol("3f51b5");
      setsdpro(100);
    } else if (location.state.order_status === "Cancelled") {
    }
    // props.changeprogress(100);
  };

  const loadItems = () => {
    var items = [];
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.changeprogress(25);
        axios
          .post("/getuserdetails", {
            uid: user.uid,
          })
          .then(function (res) {
            // console.log(res.data);
            props.changeprogress(60);
            var tot = 0;
            for (let j = 0; j < res.data.orders.length; j++) {
              if (res.data.orders[j].orderID === location.state.order_id) {
                break;
              }
              tot++;
            }

            // console.log(res.data.orders[tot]);

            for (let i = 0; i < res.data.orders[tot].totalItems; i++) {
              var obj = {};
              obj["pid"] = res.data.orders[tot]["order_item_" + i].pid;

              obj["pimage1"] = res.data.orders[tot]["order_item_" + i].pimage1;

              obj["price"] = res.data.orders[tot]["order_item_" + i].price;

              obj["original_price"] =
                res.data.orders[tot]["order_item_" + i].original_price;

              obj["size"] = res.data.orders[tot]["order_item_" + i].size;

              obj["gendercol"] =
                res.data.orders[tot]["order_item_" + i].gendercol;

              obj["categorycoll"] =
                res.data.orders[tot]["order_item_" + i].categorycoll;

              obj["discount"] =
                res.data.orders[tot]["order_item_" + i].discount;

              obj["brand_name"] =
                res.data.orders[tot]["order_item_" + i].brand_name;

              obj["product_main_text"] =
                res.data.orders[tot]["order_item_" + i].product_main_text;

              obj["qty"] = res.data.orders[tot]["order_item_" + i].qty;

              obj["cart_item_id"] =
                res.data.orders[tot]["order_item_" + i].cart_item_id;

              // obj["time"] = doc.data()["order_item_" + i].time;

              items.push(obj);
            }
            setallItems(items);
            props.changeprogress(100);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
      }
    });
  };

  useEffect(() => {
    loadItems();
    window.scrollTo(0, 0);
    setTimeout(() => {
      settracking();
    }, 500);
    // eslint-disable-next-line
  }, []);

  var list = allItems.map((item, index) => (
    <div key={item.cart_item_id}>
      <NavLink
        to={{
          pathname: "/productdetails",
          state: {
            gendercoll2: item.gendercol,
            categorycoll2: item.categorycoll,
            product_id: item.pid,
          },
        }}
        style={{ textDecoration: "none" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "5px",
            width: "155px",
          }}
        >
          <img
            src={item.pimage1}
            alt=""
            style={{ width: "150px", height: "200px" }}
          />
          <span className="brand-name" style={{ color: "black" }}>
            {item.brand_name}
          </span>
          <span className="product-small-desc">Size: {item.size}</span>
          <span className="product-small-desc">{item.product_main_text}</span>
          <div>
            <span className="brand-name" style={{ color: "black" }}>
              ₹{item.price}
            </span>
            <span className="discount-text">₹{item.discount} OFF</span>
          </div>
        </div>
      </NavLink>
    </div>
  ));

  return (
    <>
      <div
        style={{
          width: window.innerWidth,
          height: "auto",
          background: "white",
          padding: "10px",
          marginTop: "60px",
        }}
      >
        <span style={{ color: "gray", fontWeight: "bold" }}>
          {location.state.order_id}
        </span>
      </div>

      <div
        style={{
          width: window.innerWidth,
          height: "auto",
          padding: "10px",
          background: "white",
          marginTop: "10px",
        }}
      >
        <b>Track Package</b>
      </div>
      {location.state.order_status !== "Cancelled" ? (
        <>
          {" "}
          <div
            style={{
              width: window.innerWidth,
              height: "auto",
              padding: "10px",
              background: "white",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {" "}
              <div
                className="right"
                style={{ marginBottom: "18px", marginTop: "5px" }}
              >
                <CheckCircleOutlineIcon style={{ color: delrightcol }} />
              </div>
              <div
                style={{
                  width: "80px",
                  transform: "rotate(-90deg)",
                  marginBottom: "16px",
                  marginTop: "18px",
                }}
                className="progress-class"
              >
                <LinearProgress variant="determinate" value={sdpro} />
              </div>
              <div
                className="right"
                style={{ marginBottom: "18px", marginTop: "18px" }}
              >
                <CheckCircleOutlineIcon style={{ color: shrightcol }} />
              </div>
              <div
                style={{
                  width: "80px",
                  transform: "rotate(-90deg)",
                  marginBottom: "16px",
                  marginTop: "18px",
                }}
                className="progress-class"
              >
                <LinearProgress variant="determinate" value={pspro} />
              </div>
              <div
                className="right"
                style={{ marginBottom: "18px", marginTop: "18px" }}
              >
                <CheckCircleOutlineIcon style={{ color: parightcol }} />
              </div>
              <div
                style={{
                  width: "80px",
                  transform: "rotate(-90deg)",
                  marginBottom: "18px",
                  marginTop: "18px",
                }}
                className="progress-class"
              >
                <LinearProgress variant="determinate" value={oppro} />
              </div>
              <div
                className="right"
                style={{ marginBottom: "18px", marginTop: "16px" }}
              >
                <CheckCircleOutlineIcon style={{ color: orrightcol }} />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexDirection: "column",
                height: "323px",
                marginBottom: "7px",
              }}
            >
              {" "}
              <div className="right">
                <span style={{ color: "gray", display: dedispaly }}>
                  Delivered on {location.state.delivered_date}
                </span>
              </div>
              <div className="right">
                <span style={{ color: "gray", display: shdispaly }}>
                  Shipped on {location.state.shipped_date}
                </span>
              </div>
              <div className="right">
                <span style={{ color: "gray", display: padispaly }}>
                  Packed on {location.state.packed_date}
                </span>
              </div>
              <div className="right">
                <span style={{ color: "gray", display: ordispaly }}>
                  Ordered on {location.state.order_date}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              width: window.innerWidth,
              height: "auto",
              padding: "10px",
              background: "white",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {" "}
            <span>
              Your Order has been{" "}
              <b style={{ color: "#ea3232" }}>
                Cancelled on {location.state.expected_date}
              </b>{" "}
              as per your request
            </span>
          </div>
        </>
      )}

      <div
        style={{
          width: window.innerWidth,
          height: "auto",
          padding: "10px",
          background: "white",
          marginTop: "10px",
        }}
      >
        <b>All Items</b> in your Order
      </div>
      <div
        className="allItemsCon"
        style={{
          width: window.innerWidth,
          height: "auto",
          padding: "10px",
          background: "white",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {list}
      </div>

      <div
        style={{
          width: window.innerWidth,
          height: "auto",
          padding: "10px",
          background: "white",
          marginTop: "10px",
        }}
      >
        <b>Address Details</b>
      </div>
      <div
        style={{
          background: "white",
          width: window.innerWidth,
          height: "auto",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <strong>{location.state.name}</strong>
        <span style={{ marginTop: "5px", marginBottom: "5px" }}>
          {location.state.address}
        </span>
        <strong>+91 {location.state.mobile}</strong>
      </div>

      <div
        style={{
          marginTop: "10px",
          background: "white",
          width: window.innerWidth,
          height: "auto",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          marginBottom: "80px",
        }}
      >
        <strong>PRICE DETAILS ({location.state.totalItems} Items)</strong>
        <Divider style={{ margin: "5px", width: "100%" }} />
        <div
          style={{
            width: window.innerWidth - 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2px",
            marginBottom: "2px",
          }}
        >
          <span>Total MRP</span>
          <span>₹{location.state.total_original_price}</span>
        </div>
        <div
          style={{
            width: window.innerWidth - 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2px",
            marginBottom: "2px",
          }}
        >
          <span>Discount on MRP</span>
          <span style={{ color: "#03a685" }}>
            -₹{location.state.total_discount_price}
          </span>
        </div>
        {/* <div
              style={{
                width: window.innerWidth - 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "2px",
                marginBottom: "2px",
              }}
            >
              <span>Coupon Discount</span>
              <span style={{color:"#03a685"}}>-₹{totalOriginalPrice-totalPrice}</span>
            </div> */}

        <div
          style={{
            width: window.innerWidth - 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2px",
            marginBottom: "2px",
          }}
        >
          <span>
            Convenience Fee
            <span style={{ color: "rgb(228, 37, 69)", fontWeight: "bold" }}>
              {" "}
              Know More
            </span>
          </span>
          <span>
            {location.state.total_original_price -
              location.state.total_discount_price >
            999 ? (
              <>
                <del>₹99</del>
              </>
            ) : (
              <>₹99</>
            )}
          </span>
        </div>
        <Divider style={{ margin: "5px", width: "100%" }} />
        <div
          style={{
            width: window.innerWidth - 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2px",
            marginBottom: "2px",
          }}
        >
          <strong>
            <span>Total Amount</span>
          </strong>
          <strong>
            <span>₹{location.state.total_amount}</span>
          </strong>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
