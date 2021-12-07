import React, { useState, useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import { NavLink, useHistory } from "react-router-dom";
import firebase from "../firebaseconn";
import { Badge } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import axios from './axios'
const Navbar = () => {
  const history = useHistory();
  const [tot, settot] = useState(0);
  const cartotalitem = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        axios
          .post("/getuserdetails", {
            uid: user.uid,
          })
          .then(function (res) {
            settot(res.data.cart.length)
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };

  useEffect(() => {
    cartotalitem();
  });

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
          <ArrowBackIcon
            onClick={() => {
              history.goBack();
            }}
          />

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
        >          <div className="nav-icons">
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
