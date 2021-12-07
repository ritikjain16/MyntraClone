import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import firebase from "../firebaseconn";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import { MyRipples } from "./MyRipples";
import Skeleton from "@material-ui/lab/Skeleton";
import EmptyList from "./EmptyList";
import PleaseLogn from "./PleaseLogn";
import orderimg from "../Images/orderimg.jpg";
import axios from "./axios";
const Orders = (props) => {
  const [allOrders, setallOrders] = useState([]);
  const [isl, setisl] = useState(false);
  const [isEmpty, setisEmpty] = useState(false);
  const [isUser, setisUser] = useState(true);
  const loadOrders = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.changeprogress(25);
        setisUser(true);
        props.changeprogress(50);
        axios
          .post("/getuserdetails", {
            uid: user.uid,
          })
          .then(function (res) {
            props.changeprogress(75);
            setallOrders(res.data.orders.reverse());
            setisl(true);
            if (res.data.orders.length === 0) {
              setisEmpty(true);
              props.changeprogress(100);
            } else {
              setisEmpty(false);
              props.changeprogress(100);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        setisUser(false);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    // window.addEventListener("popstate", () => {
    //   history.push("/orders");
    // });
    // window.removeEventListener("popstate", () => {
    //   history.push("/orders");
    // });
    // eslint-disable-next-line
  }, []);

  var cancelOrder = (oid) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.changeprogress(10);
        const d = new Date();
        d.setDate(d.getDate());

        axios
          .post("/cancelorder", {
            uid: user.uid,
            orderID: oid,
            order_status: "Cancelled",
            expected_date:
              d.getDate() +
              " " +
              d.toLocaleString("default", { month: "short" }) +
              " " +
              d.getFullYear(),
          })
          .then(function (res) {
            loadOrders();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
      }
    });
  };

  var list = allOrders.map((item, index) => (
    <div key={index} >
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
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background:
                item.order_status === "Ordered" ||
                  item.order_status === "Packed" ||
                  item.order_status === "Shipped" ||
                  item.order_status === "Delivered"
                  ? "#03a685"
                  : "#ea3232",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "6px",
              borderRadius: "20px",
            }}
          >
            <LocalMallOutlinedIcon style={{ color: "white" }} />
          </div>
          <div style={{ marginLeft: "10px" }}>
            <span
              style={{
                color:
                  item.order_status === "Ordered" ||
                    item.order_status === "Packed" ||
                    item.order_status === "Shipped" ||
                    item.order_status === "Delivered"
                    ? "#03a685"
                    : "#ea3232",
                fontWeight: "bold",
              }}
            >
              {item.order_status}
            </span>
            <br />
            <span style={{ color: "gray", fontSize: "13px" }}>
              {item.order_status === "Ordered" ? (
                <> Arriving by, {item.expected_date}</>
              ) : (
                <> On, {item.expected_date} as per your Request</>
              )}
            </span>
          </div>
        </div>
        <NavLink
          to={{
            pathname: "/orderDetails",
            state: {
              order_id: item.orderID,
              totalItems: item.totalItems,
              name: item.name,
              address: item.address,
              mobile: item.mobile,
              uid: item.uid,
              time: item.time,
              total_original_price: item.total_original_price,
              total_discount_price: item.total_discount_price,
              total_amount: item.total_amount,
              order_date: item.order_date,
              packed_date: item.packed_date,
              shipped_date: item.shipped_date,
              delivered_date: item.delivered_date,
              order_status: item.order_status,
              payment_method: item.payment_method,
              expected_date: item.expected_date,
            },
          }}
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: window.innerWidth - 20,
              height: "auto",
              marginTop: "5px",
              background: "#f5f5f5",
              padding: "10px",
            }}
          >
            <div style={{ width: "80px" }}>
              <img
                src={item.order_item_0.pimage1}
                alt=""
                style={{ width: "100%" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <strong style={{ color: "#332f2f" }}>
                {item.order_item_0.brand_name}
              </strong>
              <span style={{ color: "gray", fontSize: "13px" }}>
                {item.order_item_0.product_main_text}
              </span>
              <span style={{ color: "gray", fontSize: "13px" }}>
                Size: {item.order_item_0.size}
              </span>

              {item.totalItems - 1 === 0 ? (
                <></>
              ) : (
                <>
                  {" "}
                  <strong style={{ color: "#332f2f" }}>
                    + {item.totalItems - 1} more
                  </strong>
                </>
              )}
            </div>
          </div>
        </NavLink>
        {item.order_status === "Ordered" ||
          item.order_status === "Packed" ||
          item.order_status === "Shipped" ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                width: window.innerWidth - 20,
                height: "auto",
                background: "#f5f5f5",
                padding: "6px",
              }}
            >
              <MyRipples>
                <div
                  style={{
                    background: "white",
                    padding: "3px",
                    width: window.innerWidth - 40,
                    border: "1px solid gray",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    cancelOrder(item.orderID);
                  }}
                >
                  <span>CANCEL</span>
                </div>
              </MyRipples>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  ));

  return (
    <>
      {isUser ? (
        <>
          <div
            style={{
              marginTop: "60px",
              width: window.innerWidth,
              height: "auto",
            }}
          >
            <div
              style={{
                background: "white",
                width: window.innerWidth,
                height: "auto",
                padding: "10px",
              }}
            >
              Showing <strong>All Orders</strong>
            </div>
            {isl ? (
              <>
                {isEmpty ? (
                  <>
                    <div style={{ marginTop: "-70px" }}>
                      <EmptyList msg="You have no Orders Yet" imgu={orderimg} />
                    </div>
                  </>
                ) : (
                  <> {list}</>
                )}
              </>
            ) : (
              <>
                <div
                  style={{
                    width: window.innerWidth,
                    padding: "10px",
                    marginTop: "20px",
                    background: "white",
                  }}
                >
                  {" "}
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="rect" animation="wave" height={150} />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                </div>
                <div
                  style={{
                    width: window.innerWidth,
                    padding: "10px",
                    marginTop: "20px",
                    background: "white",
                  }}
                >
                  {" "}
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="rect" animation="wave" height={150} />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                </div>
                <div
                  style={{
                    width: window.innerWidth,
                    padding: "10px",
                    marginTop: "20px",
                    background: "white",
                  }}
                >
                  {" "}
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="rect" animation="wave" height={150} />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                </div>
                <div
                  style={{
                    width: window.innerWidth,
                    padding: "10px",
                    marginTop: "20px",
                    background: "white",
                  }}
                >
                  {" "}
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="rect" animation="wave" height={150} />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                </div>
                <div
                  style={{
                    width: window.innerWidth,
                    padding: "10px",
                    marginTop: "20px",
                    background: "white",
                  }}
                >
                  {" "}
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="rect" animation="wave" height={150} />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                </div>
                <div
                  style={{
                    width: window.innerWidth,
                    padding: "10px",
                    marginTop: "20px",
                    background: "white",
                  }}
                >
                  {" "}
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="rect" animation="wave" height={150} />
                  <Skeleton variant="text" animation="wave" />
                  <Skeleton variant="text" animation="wave" />
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <PleaseLogn />
        </>
      )}
    </>
  );
};

export default Orders;
