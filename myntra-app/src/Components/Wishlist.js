import React, { useState, useEffect } from "react";
import firebase from "../firebaseconn";
import { NavLink } from "react-router-dom";
import ProdSkeleton1 from "./ProdSkeleton1";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import PleaseLogn from "./PleaseLogn";
import EmptyList from "./EmptyList";
import wishlistemptyimg from "../Images/wishlist.png";
import axios from "./axios";
const Wishlist = (props) => {
  const [allwishlistitems, setallwishlistitems] = useState([]);
  const [isUser, setisUser] = useState(true);

  const [isl, setisl] = useState(false);

  const [isEmpty, setisEmpty] = useState(false);

  const loadwishlist1 = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.changeprogress(25);
        setisUser(true);
        axios
          .post("/getuserdetails", {
            uid: user.uid,
          })
          .then(function (res) {
            // console.log(res);
            props.changeprogress(50);
            setallwishlistitems(res.data.wishlist.reverse());
            setisl(true);
            if (res.data.wishlist.length === 0) {
              setisEmpty(true);
              props.changeprogress(75);
            } else {
              setisEmpty(false);
              props.changeprogress(75);
            }
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
    loadwishlist1();
    // loadwishlist();
    // eslint-disable-next-line
  }, []);

  var list = allwishlistitems.map((item, index) => (
    <div
      style={{
        width: window.innerWidth / 2 - 12,
        margin: "2px",
        border: "1px solid #f1eaea",
        borderRadius: "7px",
      }}
      key={item.pid}
    >
      <div className="product-image-con">
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
          <img
            src={item.pimage1}
            alt=""
            className="product-image"
            style={{ borderRadius: "7px 7px 0px 0px" }}
          />
          <div
            className="product-price-con"
            style={{
              width: window.innerWidth / 2 - 14,
              borderRadius: "0px 0px 7px 7px",
              height: "60px",
            }}
          >
            <span className="brand-name">{item.brand_name}</span>
            <br />
            <span className="brand-name">₹{item.price}</span>
            <span className="product-small-desc">
              <del>₹{item.original_price}</del>
            </span>
            <span className="discount-text" style={{ fontSize: "10px" }}>
              (Rs. {item.discount} OFF)
            </span>
          </div>
        </NavLink>
      </div>{" "}
      <CancelOutlinedIcon
        style={{
          position: "relative",
          top: "-290px",
          right: -window.innerWidth / 2 + 42,
          color: "rgb(228, 37, 69)",
          background: "white",
          borderRadius: "10px",
        }}
        onClick={() => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              props.changeprogress(10);
              axios
                .post("/removewishlistitem", {
                  uid: user.uid,
                  pid: item.pid,
                })
                .then(function (res) {
                  loadwishlist1();
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          });
        }}
      />
    </div>
  ));

  return (
    <>
      {isUser ? (
        <>
          {" "}
          {!isEmpty ? (
            <>
              <div
                className="product-con"
                style={{
                  width: window.innerWidth,
                  background: "white",
                  marginTop: "62px",
                  display: "flex",
                  flexWrap: "wrap",
                  padding: "4px",
                  justifyContent: "center",
                }}
              >
                {isl ? (
                  <>{list}</>
                ) : (
                  <>
                    <ProdSkeleton1 />
                    <ProdSkeleton1 />
                    <ProdSkeleton1 />
                    <ProdSkeleton1 />
                    <ProdSkeleton1 />
                    <ProdSkeleton1 />
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <EmptyList
                msg="No Items in Your Wishlist"
                imgu={wishlistemptyimg}
              />
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

export default Wishlist;
