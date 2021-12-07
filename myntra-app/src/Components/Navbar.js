import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { NavLink } from "react-router-dom";
import firebase from "../firebaseconn";
import { Badge } from "@material-ui/core";
import AllItemsMenu from "./AllItemsMenu";
import axios from "./axios";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const Navbar = () => {
  const [user, setuser] = useState(false);
  const [usermobile, setusermobile] = useState("");
  const [imgurl, setimgurl] = useState("");
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const checkuser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setuser(true);
        axios
          .post("/getuserdetails", {
            uid: user.uid,
          })
          .then(function (res) {
            setusermobile(res.data.number);
            setimgurl(res.data.photoUrl);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        setuser(false);
      }
    });
  };
  const [tot, settot] = useState(0);
  const cartotalitem = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        axios
          .post("/getuserdetails", {
            uid: user.uid,
          })
          .then(function (res) {
            settot(res.data.cart.length);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  useEffect(() => {
    checkuser();
    cartotalitem();
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <>
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === "top" || anchor === "bottom",
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        {!user ? (
          <>
            <div>
              <img
                src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2021/7/9/7a988b7f-41c1-4f36-a980-74448f082dcc1625769349253-Banner_Login-page-400.png"
                alt=""
                className="signup-img"
              />
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                <h6 className="sign-up-text">SIGN UP AND LOGIN</h6>
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <div style={{ padding: "30px", background: "#3f3947" }}>
              {imgurl === "" ? (
                <>
                  <AccountCircleIcon
                    style={{
                      borderRadius: "50%",
                      marginBottom: "10px",
                      width: "96px",
                      height: "96px",
                      color: "white",
                    }}
                  />
                  <br />
                </>
              ) : (
                <>
                  <img
                    src={imgurl}
                    alt=""
                    style={{
                      borderRadius: "50%",
                      marginBottom: "10px",
                      width: "96px",
                      height: "96px",
                    }}
                  />
                  <br />
                </>
              )}

              <span style={{ color: "white", fontWeight: "bold" }}>
                {usermobile}
              </span>
            </div>

            {/* <Divider style={{ background: "gray" }} /> */}

            <div style={{ padding: "10px" }}>
              <NavLink
                to={{
                  pathname: "/cart",
                }}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "20px",
                }}
              >
                <div style={{ paddingLeft: "30px" }}>Cart</div>
              </NavLink>
            </div>
            {/* <Divider style={{ background: "gray" }} /> */}
            <div style={{ padding: "10px" }}>
              <NavLink
                to={{
                  pathname: "/orders",
                }}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "20px",
                }}
              >
                <div style={{ paddingLeft: "30px" }}>Orders</div>
              </NavLink>
            </div>
            {/* <Divider style={{ background: "gray" }} /> */}
            <div style={{ padding: "10px" }}>
              <NavLink
                to={{
                  pathname: "/wishlist",
                }}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "20px",
                }}
              >
                <div style={{ paddingLeft: "30px" }}>Wishlist</div>
              </NavLink>
            </div>
            {/* <Divider style={{ background: "gray" }} /> */}
            <div style={{ padding: "10px" }}>
              <NavLink
                to={{
                  pathname: "/account",
                }}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "20px",
                }}
              >
                <div style={{ paddingLeft: "30px" }}>Account</div>
              </NavLink>
            </div>
            {/* <Divider style={{ background: "gray" }} /> */}
            <div style={{ padding: "10px" }}>
              <span
                onClick={() => {
                  firebase
                    .auth()
                    .signOut()
                    .then(() => {
                      window.location = "/";
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "20px",
                }}
              >
                <div style={{ paddingLeft: "30px" }}>Logout</div>
              </span>
            </div>
            {/* <Divider style={{ background: "gray" }} /> */}
          </>
        )}
      </div>
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === "top" || anchor === "bottom",
        })}
        style={{ width: "280px" }}
      >
        <AllItemsMenu />
      </div>
    </>
  );

  return (
    <>
      <div
        style={{
          width: window.innerWidth,
          background: "white",
          height: "60px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          top: "0px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MenuIcon onClick={toggleDrawer("left", true)} />
          <SwipeableDrawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
          <div style={{ marginLeft: "10px" }}>
            <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
              Myntra
            </NavLink>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: "16px",
          }}
        >
          {/* <div className="nav-icons">
            <AddBoxOutlinedIcon />
          </div> */}

          <div className="nav-icons">
            <NavLink
              to="/search"
              style={{ textDecoration: "none", color: "black" }}
            >
              <SearchOutlinedIcon />
            </NavLink>
          </div>
          <div className="nav-icons">
            <NavLink
              to="/wishlist"
              style={{ textDecoration: "none", color: "black" }}
            >
              <FavoriteBorderOutlinedIcon />
            </NavLink>
          </div>
          <div className="nav-icons">
            <NavLink
              to="/cart"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Badge badgeContent={tot} color="secondary">
                <LocalMallOutlinedIcon />
              </Badge>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
