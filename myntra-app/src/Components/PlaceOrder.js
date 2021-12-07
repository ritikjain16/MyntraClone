import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Divider, Button, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../firebaseconn";
import axios from "./axios";
import myimg from "../Images/myimg.jpg";
import orp from "../Images/orderplaced.jpg";
import EmptyList from "./EmptyList";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: window.innerWidth - 30,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const PlaceOrder = (props) => {
  let location = useLocation();
  const classes = useStyles();
  // console.log(location.state);

  const [isOrderPlaced, setisOrderPlaced] = useState(false);

  const [backdrop, setbackdrop] = useState(true);

  const placeTheOrder = () => {
    // var deletecartItemsid = [];

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // var uid = user.uid;
        props.changeprogress(25);
        setbackdrop(true);
        var date = new Date();
        var components = [
          date.getDate(),
          date.getMonth() + 1,
          date.getFullYear(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getMilliseconds(),
        ];

        var orderID = "OD" + components.join("");

        date.setDate(date.getDate());

        var myobj = {};
        myobj["totalItems"] = location.state.allCartItems1.length;
        for (let i = 0; i < location.state.allCartItems1.length; i++) {
          myobj["order_item_" + i] = location.state.allCartItems1[i];

          // deletecartItemsid.push(location.state.allCartItems1[i].cart_item_id);
        }
        myobj["name"] = location.state.nam1;
        myobj["address"] = location.state.addr1;
        myobj["mobile"] = location.state.mobil1;
        myobj["uid"] = user.uid;
        myobj["sortdate"] = Date.now();
        // myobj["time"] = firebase.firestore.FieldValue.serverTimestamp();
        myobj["total_original_price"] = location.state.top1;
        myobj["total_discount_price"] = location.state.td1;
        myobj["total_amount"] = location.state.ta1;
        myobj["orderID"] = orderID;
        myobj["order_date"] =
          date.getDate() +
          " " +
          date.toLocaleString("default", { month: "short" }) +
          " " +
          date.getFullYear();
        myobj["packed_date"] = "";
        myobj["shipped_date"] = "";
        myobj["delivered_date"] = "";
        myobj["order_status"] = "Ordered";
        myobj["expected_date"] = location.state.date3;
        myobj["payment_method"] = "COD";

        // console.log(myobj)
        props.changeprogress(50);
        axios
          .post("/placeOrder1", {
            uid: user.uid,
            orderobj: myobj,
            oid: orderID,
          })
          .then(function (res) {
            // console.log(res);
            setbackdrop(false);
            props.changeprogress(100);
            setisOrderPlaced(true);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
      }
    });
  };

  // -----------------------------------

  // const REACT_APP_BACKEND = "http://localhost:8001/api";
  const REACT_APP_BACKEND = process.env.Backend;

  const [values, setvalues] = useState({
    amount: 0,
    orderId: "",
    error: "",
    success: false,
  });
  const { amount, orderId } = values;

  const createOrder = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // var uid = user.uid;
        props.changeprogress(25);
        setbackdrop(true);
        var date = new Date();
        var components = [
          date.getDate(),
          date.getMonth() + 1,
          date.getFullYear(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getMilliseconds(),
        ];

        var orderID = "OD" + components.join("");

        date.setDate(date.getDate());

        var myobj = {};
        myobj["totalItems"] = location.state.allCartItems1.length;
        for (let i = 0; i < location.state.allCartItems1.length; i++) {
          myobj["order_item_" + i] = location.state.allCartItems1[i];

          // deletecartItemsid.push(location.state.allCartItems1[i].cart_item_id);
        }
        myobj["name"] = location.state.nam1;
        myobj["address"] = location.state.addr1;
        myobj["mobile"] = location.state.mobil1;
        myobj["uid"] = user.uid;
        myobj["sortdate"] = Date.now();
        // myobj["time"] = firebase.firestore.FieldValue.serverTimestamp();
        myobj["total_original_price"] = location.state.top1;
        myobj["total_discount_price"] = location.state.td1;
        myobj["total_amount"] = location.state.ta1;
        // myobj["orderID"] = orderID;
        myobj["order_date"] =
          date.getDate() +
          " " +
          date.toLocaleString("default", { month: "short" }) +
          " " +
          date.getFullYear();
        myobj["packed_date"] = "";
        myobj["shipped_date"] = "";
        myobj["delivered_date"] = "";
        myobj["order_status"] = "Ordered";
        myobj["expected_date"] = location.state.date3;
        myobj["payment_method"] = "ONLINE";
        props.changeprogress(50);
        axios
          .post(`${REACT_APP_BACKEND}/createorder`, {
            amount1: parseFloat(location.state.ta1 * 100),
            uid: user.uid,
            orderobj: myobj,
            oid: orderID,
          })
          .then((response) => {
            // console.log(response);
            // response.json();
            if (response.error) {
              setvalues({ ...values, error: response.error, success: false });
            } else {
              setvalues({
                ...values,
                error: "",
                success: true,
                orderId: response.data.id,
                amount: response.data.amount,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
      }
    });
  };

  const [key, setkey] = useState("");

  useEffect(() => {
    props.changeprogress(10);
    axios
      .post("/getkey")
      .then(async function (res) {
        // console.log(res.data);
        await setkey(res.data);
        // console.log(key);
        createOrder();
      })
      .catch((e) => {
        console.log(e);
      });
      // eslint-disable-next-line
  }, []);

  const showRazorpay = () => {
    props.changeprogress(75);
    const form = document.createElement("form");
    form.setAttribute("action", `${REACT_APP_BACKEND}/payment/callback`);
    form.setAttribute("method", "POST");

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    // script.setAttribute("data-key", REACT_APP_DATA_KEY);
    script.setAttribute("data-key", key);
    script.setAttribute("data-amount", amount);
    script.setAttribute("data-prefill.contact", "");
    script.setAttribute("data-order_id", orderId);
    script.setAttribute("data-prefill.name", "Myntra");
    script.setAttribute("data-prefill.email", "");
    script.setAttribute("data-image", myimg);
    script.setAttribute("data-description", "Myntra Payments");
    script.setAttribute("data-theme.color", "#ffffff");
    script.setAttribute("data-buttontext", "PAY ONLINE");
    script.setAttribute("class", "payclass");
    // document.body.appendChild(form);
    document.getElementById("paym").appendChild(form);
    form.appendChild(script);
    const input = document.createElement("input");
    input.type = "hidden";
    input.custom = "Hidden Element";
    input.name = "hidden";
    form.appendChild(input);
    props.changeprogress(100);
    setbackdrop(false);
  };

  useEffect(() => {
    if (amount > 0 && orderId !== "") {
      showRazorpay();
    }
    // eslint-disable-next-line
  }, [amount]);

  //----------------------------------------

  return (
    <>
      <Backdrop
        style={{ color: "rgb(228, 37, 69)", zIndex: "10" }}
        open={backdrop}
      >
        {/* <CircularProgress color="rgb(228, 37, 69)" /> */}
      </Backdrop>
      {!isOrderPlaced ? (
        <>
          <div
            style={{
              marginTop: "70px",
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
            <strong>{location.state.nam1}</strong>
            <span style={{ marginTop: "5px", marginBottom: "5px" }}>
              {location.state.addr1}
            </span>
            <strong>+91 {location.state.mobil1}</strong>
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
            <strong>PRICE DETAILS ({location.state.titem1})</strong>
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
              <span>₹{location.state.top1}</span>
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
              <span style={{ color: "#03a685" }}>-₹{location.state.td1}</span>
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
                {location.state.top1 - location.state.td1 > 999 ? (
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
                <span>₹{location.state.ta1}</span>
              </strong>
            </div>
          </div>

          <div className="continue-btn" style={{ width: window.innerWidth }}>
            <div
              id="paym"
              className={classes.button}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                backgroundColor: "rgb(228, 37, 69)",
                width: "94%",
                padding: "6px",
                borderRadius: "5px",
              }}
            ></div>
            <Button
              variant="contained"
              className={classes.button}
              style={{
                color: "white",
                backgroundColor: "rgb(228, 37, 69)",
                width: "94%",
              }}
              onClick={placeTheOrder}
            >
              Place Order (COD)
            </Button>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              marginTop: "60px",
              background: "white",
              width: window.innerWidth,
              height: window.outerHeight,
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ marginTop: "-260px" }}>
              <EmptyList msg="" imgu={orp} />
            </div>

            <NavLink
              to="/orders"
              style={{ textDecoration: "none", marginTop: "-80px" }}
            >
              <Button
                variant="outlined"
                className={classes.button}
                style={{
                  color: "rgb(228, 37, 69)",
                  backgroundColor: "white",
                  width: window.innerWidth - 20,
                  border: "1px solid rgb(228, 37, 69)",
                }}
              >
                View Orders
              </Button>
            </NavLink>
          </div>
        </>
      )}
    </>
  );
};

export default PlaceOrder;
