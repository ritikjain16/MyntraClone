import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import ProdSkeleton from "./ProdSkeleton";
import { Button } from "@material-ui/core";
import axios from "./axios";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
const ProductsPAge = (props) => {
  const [productList, setproductList] = useState([]);

  const [isl, setisl] = useState(false);
  let location = useLocation();

  const loadProducts1 = (pd) => {
    props.changeprogress(40);
    axios
      .post(pd, {
        gencol: location.state.gendercoll,
        catcol: location.state.categorycoll,
      })
      .then(function (response) {
        // console.log(response.data);
        setproductList(response.data.reverse());
        setisl(true);
        props.changeprogress(100);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    loadProducts1("/pd");
    // eslint-disable-next-line
  }, []);

  var list = productList.map((item) => (
    <div
      className="product-image-con"
      style={{ width: window.innerWidth / 2 - 1 }}
      key={item._id}
    >
      <NavLink
        to={{
          pathname: "/productdetails",
          state: {
            gendercoll2: location.state.gendercoll,
            categorycoll2: location.state.categorycoll,
            product_id: item._id,
          },
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <img src={item.images[0]} alt="" className="product-image" />
        <div
          className="product-price-con"
          style={{ width: window.innerWidth / 2 - 1 }}
        >
          <span className="brand-name">{item.brand_name}</span>
          <br />
          <span className="product-small-desc">{item.small_desc}</span>
          <br />
          <span className="brand-name">₹{item.price}</span>
          <span className="product-small-desc">
            <del>₹{item.original_price}</del>
          </span>
          <span className="discount-text">
            (
            {(((item.original_price - item.price) * 100) / item.original_price)
              .toString()
              .substr(0, 2)}
            % OFF)
          </span>
        </div>
      </NavLink>
    </div>
  ));

  return (
    <>
      <div
        className="product-con"
        style={{
          width: window.innerWidth,
          marginTop: "64px",
          marginBottom: "51px",
        }}
      >
        {isl ? (
          <>{list}</>
        ) : (
          <>
            <ProdSkeleton />
            <ProdSkeleton />
            <ProdSkeleton />
            <ProdSkeleton />
            <ProdSkeleton />
            <ProdSkeleton />
            <ProdSkeleton />
            <ProdSkeleton />
          </>
        )}
      </div>

      <div
        style={{
          width: window.innerWidth,
          background: "white",
          position: "fixed",
          bottom: "0px",
          height: "50px",
        }}
        className="shadow"
      >
        <Button
          variant="contained"
          startIcon={<SwapVertIcon />}
          style={{
            color: "black",
            backgroundColor: "white",
            width: window.innerWidth,
            height: "50px",
          }}
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasBottom"
          aria-controls="offcanvasBottom"
        >
          SORT
        </Button>
      </div>
      <div
        className="offcanvas offcanvas-bottom"
        tabIndex="-1"
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
        style={{ height: "auto", padding: "8px" }}
      >
        <div
          style={{
            color: "#3e4152",
            fontSize: "20px",
            fontWeight: "500",
            margin: "3px",
            borderBottom: "0.5px solid #d2d4dc",
            paddingBottom: "5px",
          }}
        >
          SORT BY
        </div>

        <div
          style={{ margin: "3px", paddingLeft: "10px" }}
          className="d-flex flex-column align-items-start"
        >
          <div
            style={{ paddingTop: "20px", fontSize: "14px", color: "#3e4152" }}
            className="d-flex align-items-center justify-content-start"
            data-bs-dismiss="offcanvas"
            onClick={() => {
              loadProducts1("/pd");
            }}
          >
            <WhatshotIcon />
            <span
              style={{
                width: window.innerWidth - 50,
                textAlign: "start",
                paddingLeft: "22px",
              }}
            >
              Newest
            </span>
          </div>
          <div
            style={{ paddingTop: "20px", fontSize: "14px", color: "#3e4152" }}
            className="d-flex align-items-center justify-content-start"
            data-bs-dismiss="offcanvas"
            onClick={() => {
              loadProducts1("/pdhtl");
            }}
          >
            <span style={{ fontSize: "20px" }}>₹</span>
            <ArrowDownwardIcon style={{ fontSize: "17px" }} />
            <span
              style={{
                width: window.innerWidth - 50,
                textAlign: "start",
                paddingLeft: "20px",
              }}
            >
              Price: High to Low
            </span>
          </div>
          <div
            style={{
              paddingTop: "20px",
              fontSize: "14px",
              color: "#3e4152",
              paddingBottom: "20px",
            }}
            className="d-flex align-items-center justify-content-start"
            data-bs-dismiss="offcanvas"
            onClick={() => {
              loadProducts1("/pdlth");
            }}
          >
            <span style={{ fontSize: "20px" }}>₹</span>
            <ArrowUpwardIcon style={{ fontSize: "17px" }} />
            <span
              style={{
                width: window.innerWidth - 50,
                textAlign: "start",
                paddingLeft: "20px",
              }}
            >
              Price: Low to High
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPAge;
