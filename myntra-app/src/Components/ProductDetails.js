import React, { useState, useEffect } from "react";
import firebase from "../firebaseconn";
import { useLocation } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import { Backdrop, Snackbar } from "@material-ui/core";
import { MyRipples } from "./MyRipples";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "./axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const ProductDetails = (props) => {
  let location = useLocation();
  const classes = useStyles();
  const [allImages, setallImages] = useState([]);
  const [allSizes, setallSizes] = useState([]);
  const [snopen, setsnopen] = useState(false);
  const [snackbarmess, setsnackbarmess] = useState(
    "Address Saved Successfully"
  );
  const [iswishlisted, setiswishlisted] = useState(false);
  const [backdrop, setbackdrop] = useState(false);

  const [details, setdetails] = useState({});
  const [pincodelength, setpincodelength] = useState("");
  const [checkcolor, setcheckcolor] = useState("gray");

  const [currentsize, setcurrentsize] = useState("");


  const loadProducts1 = () => {
    props.changeprogress(25);
    setbackdrop(true);
    axios
      .post("/pdet", {
        gencol: location.state.gendercoll2,
        catcol: location.state.categorycoll2,
        _id: location.state.product_id,
      })
      .then(function (response) {
        // console.log(response);
        setallImages(response.data[0].images);
        setallSizes(response.data[0].sizes);
        setdetails(response.data[0]);
        setbackdrop(false);
        props.changeprogress(50);
      })
      .catch((e) => {
        setbackdrop(false);
        props.changeprogress(50);
      });
  };

  const [getitbydisplay, setgetitbydisplay] = useState("none");
  const [date1, setdate1] = useState("");
  const checkDeliveryDate = (pincode) => {
    props.changeprogress(25);
    axios
      .get(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res) => {
        // console.log(res.data)
        props.changeprogress(50);
        const d = new Date();
        d.setDate(d.getDate() + 5);
        if (res.data[0].PostOffice[0].Block === "NA") {
          setdate1(
            "Deliver to " +
              res.data[0].PostOffice[0].District +
              " by " +
              d.toLocaleString("default", { month: "short" }) +
              ", " +
              d.getDate() +
              " " +
              d.getFullYear()
          );
          props.changeprogress(75);
        } else {
          setdate1(
            "Deliver to " +
              res.data[0].PostOffice[0].Block +
              " by " +
              d.toLocaleString("default", { month: "short" }) +
              ", " +
              d.getDate() +
              " " +
              d.getFullYear()
          );
          props.changeprogress(75);
        }

        setgetitbydisplay("block");
        props.changeprogress(100);
      })
      .catch((e) => {
        console.log(e);
        setdate1(
          "It seems like that you have entered a wrong pincode, please check again"
        );
        setgetitbydisplay("block");
        props.changeprogress(100);
      });
  };

  useEffect(() => {
    loadProducts1();
    // loadProductSetails();
    isAlreadyWishlisted();
    // eslint-disable-next-line
  }, []);

  const addtobag = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        if (currentsize !== "") {
          if (allSizes.includes(currentsize)) {
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

            var cartProdId = "CART" + components.join("");

            var obj = {};
            obj["pid"] = details._id;
            obj["pimage1"] = allImages[0];
            obj["price"] = details.price;
            obj["original_price"] = details.original_price;
            obj["size"] = currentsize;
            obj["gendercol"] = location.state.gendercoll2;
            obj["categorycoll"] = location.state.categorycoll2;
            obj["discount"] = details.original_price - details.price;
            obj["brand_name"] = details.brand_name;
            obj["product_main_text"] = details.product_main_text;
            obj["qty"] = 1;
            obj["cart_item_id"] = cartProdId;
            // obj["time"] = firebase.firestore.FieldValue.serverTimestamp();
            props.changeprogress(50);
            axios
              .post("/cart", {
                uid: uid,
                cartItem: obj,
              })
              .then(function (res) {
                // console.log(res);
                setbackdrop(false);
                // alert(`${details.product_main_text} added to bag`);
                props.changeprogress(100);
                setsnackbarmess(`${details.product_main_text} added to bag`);
                setsnopen(true);
                setTimeout(() => {
                  setsnopen(false);
                }, 4000);
              })
              .catch((e) => {
                console.log(e);
                props.changeprogress(100);
              });
          } else {
          }
        } else {
          setsnackbarmess(`Please select a size`);
          setsnopen(true);
          setTimeout(() => {
            setsnopen(false);
          }, 2000);
        }
      } else {
        setsnackbarmess(`Please Login`);
        setsnopen(true);
        setTimeout(() => {
          setsnopen(false);
          window.location = "/login";
        }, 2000);
      }
    });
  };

  var list = allImages.map((item, index) => (
    <div key={index} style={{ width: window.innerWidth }}>
      <img src={allImages[index]} width={window.innerWidth} alt="" />
    </div>
  ));

  const wishlistMethod = () => {
    // var allwihlistitem = [];
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.changeprogress(25);
        var obj = {};
        obj["pid"] = details._id;
        obj["pimage1"] = allImages[0];
        obj["price"] = details.price;
        obj["original_price"] = details.original_price;
        obj["size"] = currentsize;
        obj["gendercol"] = location.state.gendercoll2;
        obj["categorycoll"] = location.state.categorycoll2;
        obj["discount"] = details.original_price - details.price;
        obj["brand_name"] = details.brand_name;
        obj["product_main_text"] = details.product_main_text;
        obj["qty"] = 1;
        // obj["time"] = firebase.firestore.FieldValue.serverTimestamp();
        props.changeprogress(50);
        axios
          .post("/addorremovewishlist", {
            uid: user.uid,
            witem: obj,
          })
          .then(function (res) {
            // console.log(res.data);
            if (res.data === "Added") {
              setiswishlisted(true);
              props.changeprogress(100);
            } else if (res.data === "Removed") {
              setiswishlisted(false);
              props.changeprogress(100);
            }
          })
          .catch((e) => {
            console.log(e);
            props.changeprogress(100);
          });
      }
    });
  };

  const isAlreadyWishlisted = () => {
    // var allwihlistitem = [];
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.changeprogress(75);
        axios
          .post("/iswishlisted", {
            uid: user.uid,
            pid: location.state.product_id,
          })
          .then(function (res) {
            // console.log(res.data);
            if (res.data === "Added") {
              setiswishlisted(true);
              props.changeprogress(100);
            } else if (res.data === "Removed") {
              setiswishlisted(false);
              props.changeprogress(100);
            }
          })
          .catch((e) => {
            console.log(e);
            props.changeprogress(100);
          });
      }else{
        props.changeprogress(100);
      }
    });
  };

  const handleChange = (event) => {
    setcurrentsize(event.target.value);
  };
  const vertical = "bottom";
  const horizontal = "center";
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snopen}
        message={snackbarmess}
        key={vertical + horizontal}
      />
      <Backdrop
        style={{ color: "rgb(228, 37, 69)", zIndex: "10" }}
        open={backdrop}
      >
        {/* <CircularProgress color="rgb(228, 37, 69)" /> */}
      </Backdrop>
      <div style={{ width: window.innerWidth, marginTop: "55px" }}>
        <Carousel style={{ zIndex: -1 }}>{list}</Carousel>
      </div>

      <div
        style={{
          width: window.innerWidth,
          marginTop: "0px",
          background: "white",
          height: "auto",
          padding: "10px",
        }}
      >
        <span className="product-main-text">{details.product_main_text}</span>
        <br />
        <span className="brand-name size-class">₹{details.price}</span>
        <span className="product-small-desc size-class">
          <del>₹{details.original_price}</del>
        </span>
        <span className="discount-text size-class">
          ({" "}
          {(
            ((details.original_price - details.price) * 100) /
            details.original_price
          )
            .toString()
            .substr(0, 2)}
          % OFF)
        </span>
        <br />
        <span className="size-class tax-text">inclusive of all taxes</span>
      </div>

      <div
        style={{
          width: window.innerWidth,
          marginTop: "6px",
          background: "white",
          height: "auto",
          padding: "10px",
        }}
      >
        <span className="product-main-text" style={{ fontWeight: "bold" }}>
          CHECK DELIVERY &amp; SERVICES
        </span>
        <br />

        <div
          className="pincode-check"
          style={{ width: window.innerWidth - 50 }}
        >
          <div
            style={{ width: window.innerWidth - 50 }}
            className="pincode-con"
          >
            <input
              type="tel"
              maxLength={6}
              className="pincode-text"
              value={pincodelength}
              onChange={(e) => {
                setpincodelength(e.target.value);
              }}
              onKeyUp={() => {
                if (pincodelength.length === 6) {
                  setcheckcolor("rgb(228, 37, 69)");
                } else {
                  setcheckcolor("gray");
                }
              }}
            />
            <MyRipples>
              <span
                style={{ color: checkcolor, fontWeight: "bold" }}
                onClick={() => {
                  if (pincodelength.length === 6) {
                    checkDeliveryDate(pincodelength);
                  }
                }}
              >
                CHECK
              </span>
            </MyRipples>
          </div>
        </div>

        <span
          className="product-small-desc size-class"
          style={{
            display: getitbydisplay,
            color: "rgb(228, 37, 69)",
            fontWeight: "bold",
          }}
        >
          {date1}
        </span>
        {/* <br style={{ display: getitbydisplay }} /> */}
        <span className="product-small-desc size-class">
          Pay on delivery might be available
        </span>
        <br />

        <span className="product-small-desc size-class">
          Easy 30 days returns and exchanges
        </span>
        <br />

        <span className="product-small-desc size-class">
          Try &amp; Buy might be available
        </span>
      </div>

      <div
        style={{
          width: window.innerWidth,
          marginTop: "6px",
          background: "white",
          height: "auto",
          padding: "10px",
        }}
      >
        <span className="product-main-text" style={{ fontWeight: "bold" }}>
          Select Size
        </span>
        <br />
        <div style={{ width: window.innerWidth - 70 }} className="sizes-con">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Size</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentsize}
              onChange={handleChange}
            >
              {allSizes.map((item, index) => (
                <MenuItem value={allSizes[index]} key={index}>
                  {allSizes[index]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div
        style={{
          width: window.innerWidth,
          backgroundColor: "white",
          padding: "10px",
          position: "sticky",
          bottom: "0",
        }}
        className="wishaddclass"
      >
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={iswishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          style={{
            color: iswishlisted ? "rgb(228, 37, 69)" : "black",
            backgroundColor: "white",
            width: window.innerWidth / 2 - 50,
            borderColor: iswishlisted ? "rgb(228, 37, 69)" : "",
          }}
          onClick={wishlistMethod}
        >
          WISHLIST
        </Button>

        <Button
          variant="contained"
          className={classes.button}
          startIcon={<LocalMallOutlinedIcon />}
          style={{
            color: "white",
            backgroundColor: "rgb(228, 37, 69)",
            width: window.innerWidth / 2,
          }}
          onClick={addtobag}
        >
          ADD TO BAG
        </Button>
      </div>
    </>
  );
};

export default ProductDetails;
