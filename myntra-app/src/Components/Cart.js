import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MyRipples } from "./MyRipples";
import Skeleton from "@material-ui/lab/Skeleton";
import firebase from "../firebaseconn";
import PleaseLogn from "./PleaseLogn";
import EmptyList from "./EmptyList";
import emptycartimg from "../Images/cartempty.jpg";
import axios from "./axios";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
    marginTop: -10,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const Cart = (props) => {
  const classes = useStyles();
  const [cartItems, setcartItems] = useState([]);
  const [totalItems, settotalItems] = useState("");
  const [totalPrice, settotalPrice] = useState(0);
  const [totalOriginalPrice, settotalOriginalPrice] = useState(0);
  const [date1, setdate1] = useState("");
  const [isEmpty, setisEmpty] = useState(false);
  const [isUser, setisUser] = useState(true);
  const [isl, setisl] = useState(false);
  // const [couponbtntext, setcouponbtntext] = useState("APPLY")
  // const [ctext, setctext] = useState("")
  // const [couponresulttext, setcouponresulttext] = useState("Enter your coupon Here")

  const loadCartItems1 = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.changeprogress(25);
        setisUser(true);
        axios
          .post("/getuserdetails", {
            uid: user.uid,
          })
          .then(function (res) {
            setcartItems(res.data.cart.reverse());
            if (res.data.cart.length === 1) {
              settotalItems(`${res.data.cart.length} ITEM`);
              props.changeprogress(50);
            } else {
              settotalItems(`${res.data.cart.length} ITEMS`);
              props.changeprogress(50);
            }
            if (res.data.cart.length > 0) {
              setisEmpty(false);
              props.changeprogress(75);
            } else {
              setisEmpty(true);
              props.changeprogress(75);
            }

            let toalPrie = 0,
              totalOrigialPric = 0;

            for (let i = 0; i < res.data.cart.length; i++) {
              toalPrie = toalPrie + res.data.cart[i].price;
              totalOrigialPric =
                totalOrigialPric + res.data.cart[i].original_price;
            }

            settotalPrice(toalPrie);
            settotalOriginalPrice(totalOrigialPric);

            setisl(true);
            props.changeprogress(100);
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
    loadCartItems1();
    const d = new Date();
    d.setDate(d.getDate() + 5);
    setdate1(
      d.getDate() +
      " " +
      d.toLocaleString("default", { month: "short" }) +
      " " +
      d.getFullYear()
    );
    // eslint-disable-next-line
  }, []);

  const removeItem = (cid) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.changeprogress(10);
        axios
          .post("/removecart", {
            uid: user.uid,
            cid: cid,
          })
          .then(function (res) {
            // console.log(res);

            loadCartItems1();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
      }
    });
  };

  var cartlist = cartItems.map((item, index) => (
    <div
      style={{
        marginTop: "10px",
        background: "white",
        width: window.innerWidth,
        height: "auto",
        padding: "8px",
      }}
      key={index}
    >
      <div className="cart-item-con">
        <div className="cart-prod-img">
          <NavLink
            to={{
              pathname: "/productdetails",
              state: {
                gendercoll2: item.gendercol,
                categorycoll2: item.categorycoll,
                product_id: item.pid,
              },
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <img src={item.pimage1} alt="" style={{ width: "100%" }} />
          </NavLink>
        </div>
        <div className="cart-item-details">
          <span className="brand-name">{item.brand_name}</span>
          <span className="product-small-desc">{item.product_main_text}</span>
          <div>
            <span style={{ fontSize: "14px" }} className="product-small-desc">
              Size :{item.size}
            </span>
          </div>
          <div>
            <span className="brand-name">₹{item.price}</span>
            <span className="product-small-desc">
              <del>₹{item.original_price}</del>
            </span>
            <span className="discount-text">₹{item.discount} OFF</span>
          </div>
          <div>
            <span style={{ color: "#0ca989" }}>✔</span>
            <span style={{ fontSize: "10px" }}> Delivery By</span>
            <span style={{ fontSize: "12px", fontWeight: "bold" }}>
              {" "}
              {date1}
            </span>
          </div>
        </div>
      </div>

      <Divider style={{ marginTop: "4px" }} />
      <div className="remove-move" style={{ width: window.innerWidth - 20 }}>
        <MyRipples>
          <div
            style={{
              fontSize: "14px",
              padding: "4px",
              width: "100px",
              textAlign: "center",
            }}
          >
            <span
              onClick={() => {
                removeItem(item.cart_item_id);
              }}
            >
              REMOVE
            </span>
          </div>
        </MyRipples>
        <div style={{ fontSize: "14px", padding: "4px" }}>|</div>
        <MyRipples>
          <div
            style={{
              fontSize: "14px",
              padding: "4px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <span
              onClick={() => {
                firebase.auth().onAuthStateChanged((user) => {
                  if (user) {
                    props.changeprogress(10);
                    var obj = {};
                    obj["pid"] = item.pid;
                    obj["pimage1"] = item.pimage1;
                    obj["price"] = item.price;
                    obj["original_price"] = item.original_price;
                    obj["size"] = item.size;
                    obj["gendercol"] = item.gendercol;
                    obj["categorycoll"] = item.categorycoll;
                    obj["discount"] = item.discount;
                    obj["brand_name"] = item.brand_name;
                    obj["product_main_text"] = item.product_main_text;
                    obj["qty"] = 1;
                    axios
                      .post("/movetowishlist", {
                        uid: user.uid,
                        cid: item.cart_item_id,
                        pid: item.pid,
                        witem: obj,
                      })
                      .then(function (res) {
                        // console.log(res);
                        loadCartItems1();
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  }
                });
              }}
            >
              MOVE TO WISHLIST
            </span>
          </div>
        </MyRipples>
      </div>
    </div>
  ));

  return (
    <>
      {isUser ? (
        <>
          {!isEmpty ? (
            <>
              {isl ? (
                <>
                  <div
                    style={{ marginTop: "70px", padding: "10px" }}
                    className="cart-class"
                  >
                    <span>{totalItems}</span>
                    <span>Total:₹{totalPrice}</span>
                  </div>
                  {cartlist}{" "}
                  {/* ---------------------------------------------- */}
                  {/* <div style={{
                    marginTop: "10px",
                    background: "white",
                    width: window.innerWidth,
                    height: "auto",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: window.innerWidth - 20,
                    }}>
                      <div style={{ border: "1px solid gray", padding: "6px", borderRadius: "5px", width: window.innerWidth - 150 }}>
                        <input type="text" placeholder="Enter your Code here" style={{ border: "0", outline: "0", color: "rgb(228, 37, 69)", fontWeight: "500" }} value={ctext} onChange={(e) => setctext(e.target.value)} />
                      </div>

                      <Button
                        variant="outlined"
                        className={classes.button}
                        style={{
                          color: "rgb(228, 37, 69)",
                          backgroundColor: "white",
                          width: "150px",
                          border: "1px solid rgb(228, 37, 69)",
                          padding: "6px",
                          fontWeight: "500"
                        }}

                        onClick={() => {
                          firebase.auth().onAuthStateChanged((user) => {
                            if (user) {
                              axios.post("/getuserdetails", {
                                uid: user.uid
                              }).then(async function (res) {
                                let couponArray = await res.data.coupons;
                                if (couponArray.includes(ctext)) {
                                  setcouponresulttext("You have already used this coupon")
                                } else {
                                  setcouponresulttext("Applied Successfully")
                                }
                              }).catch(e => {
                                console.log(e)
                              })

                              // axios.post("/coupons",{

                              // })
                            }
                          })
                        }}
                      >
                        {couponbtntext}
                      </Button>

                    </div>

                    <div style={{ width: window.innerWidth - 150, color: "rgb(228, 37, 69)", display: "flex", justifyContent: "flex-start", alignSelf: "start", marginLeft: "6px" }}>
                      {couponresulttext}
                    </div>

                  </div> */}
                  {/* ---------------------------------------------- */}
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
                    <strong>PRICE DETAILS ({totalItems})</strong>
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
                      <span>₹{totalOriginalPrice}</span>
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
                        -₹{totalOriginalPrice - totalPrice}
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
                        <span
                          style={{
                            color: "rgb(228, 37, 69)",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          Know More
                        </span>
                      </span>
                      <span>
                        {totalPrice > 999 ? (
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
                        <span>
                          ₹
                          {totalPrice > 999 ? (
                            <>{totalPrice}</>
                          ) : (
                            <>{totalPrice + 99}</>
                          )}
                        </span>
                      </strong>
                    </div>
                  </div>
                  <div
                    className="continue-btn"
                    style={{ width: window.innerWidth }}
                  >
                    <NavLink
                      to={{
                        pathname: "/address",
                        state: {
                          allCartItems: cartItems,
                          titem: totalItems,
                          top: totalOriginalPrice,
                          tp: totalPrice,
                          td: totalOriginalPrice - totalPrice,
                          ta: totalPrice > 999 ? totalPrice : totalPrice + 99,
                          date2: date1,
                        },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        className={classes.button}
                        style={{
                          color: "white",
                          backgroundColor: "rgb(228, 37, 69)",
                          width: "94%",
                        }}
                      >
                        Continue
                      </Button>
                    </NavLink>
                  </div>
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
            </>
          ) : (
            <>
              <EmptyList imgu={emptycartimg} msg="Your Cart is Empty" />
            </>
          )}
        </>
      ) : (
        <>
          <PleaseLogn />
        </>
      )}
    </>
  );
};

export default Cart;
