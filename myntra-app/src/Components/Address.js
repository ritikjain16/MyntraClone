import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Snackbar,
  Backdrop,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../firebaseconn";
import axios from "./axios";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
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
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Address = (props) => {
  let location = useLocation();
  const classes = useStyles();

  const [name, setname] = useState("");
  const [mobileno, setmobileno] = useState("");
  const [pincode, setpincode] = useState("");
  const [street, setstreet] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [snackbarmess, setsnackbarmess] = useState();
  const [snopen, setsnopen] = useState(false);
  const handleChange = (event) => {
    setstate(event.target.value);
  };
  const [backdrop, setbackdrop] = useState(false);

  const nameRef = React.useRef(null);
  const mobilenoRef = React.useRef(null);
  const streetRef = React.useRef(null);
  const pincodeRef = React.useRef(null);
  const cityRef = React.useRef(null);
  const stateRef = React.useRef(null);
  const [alladdresslist, setalladdresslist] = useState([])

  let allstates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setname("");
    setmobileno("");
    setstreet("");
    setpincode("");
    setcity("");
    setstate("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadAddress = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.changeprogress(25);
        axios
          .post("/getuserdetails", {
            uid: user.uid,
          })
          .then(function (res) {
            setalladdresslist(res.data.address)
            props.changeprogress(100);
          })
          .catch((e) => {
            console.log(e);
            props.changeprogress(100);
          });

      }
    });
  };

  useState(() => {
    loadAddress();
  }, []);

  const saveAddress = () => {
    if (name !== "") {
      if (mobileno.length === 10) {
        if (street !== "") {
          if (pincode.length === 6) {
            if (city !== "") {
              if (state !== "") {
                firebase.auth().onAuthStateChanged((user) => {
                  if (user) {
                    setbackdrop(true);
                    // var uid = user.uid;
                    props.changeprogress(25);
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

                    var addressID = "Address" + components.join("");
                    var obj = {};
                    obj['address_id'] = addressID;
                    obj["name"] = name;
                    obj["mobileno"] = mobileno;
                    obj["street"] = street;
                    obj["pincode"] = pincode;
                    obj["city"] = city;
                    obj["state"] = state;

                    axios
                      .post("/setaddress", {
                        uid: user.uid,
                        addressitem: obj,
                      })
                      .then(function (res) {
                        setbackdrop(false);
                        handleClose();
                        loadAddress()
                        props.changeprogress(100);
                        setsnackbarmess("Address Saved Successfully");
                        setsnopen(true);
                        setTimeout(() => {
                          setsnopen(false);
                        }, 2000);
                      })
                      .catch((e) => {
                        console.log(e);
                      });

                  }
                });
              } else {
                stateRef.current.focus();
                setsnackbarmess("Please select a State");
                setsnopen(true);
                setTimeout(() => {
                  setsnopen(false);
                }, 2000);
              }
            } else {
              cityRef.current.focus();
              setsnackbarmess("Please enter your City");
              setsnopen(true);
              setTimeout(() => {
                setsnopen(false);
              }, 2000);
            }
          } else {
            pincodeRef.current.focus();
            setsnackbarmess("Please enter a valid Pincode");
            setsnopen(true);
            setTimeout(() => {
              setsnopen(false);
            }, 2000);
          }
        } else {
          streetRef.current.focus();
          setsnackbarmess(
            "Please enter your Address (House No, Building, Street, Area)"
          );
          setsnopen(true);
          setTimeout(() => {
            setsnopen(false);
          }, 2000);
        }
      } else {
        mobilenoRef.current.focus();
        setsnackbarmess("Please enter a valid Mobile Number");
        setsnopen(true);
        setTimeout(() => {
          setsnopen(false);
        }, 2000);
      }
    } else {
      nameRef.current.focus();
      setsnackbarmess("Please enter your Name");
      setsnopen(true);
      setTimeout(() => {
        setsnopen(false);
      }, 2000);
    }
  };

  var addresslist = alladdresslist.map((item, index) => (
    <div
      key={item.address_id}
      style={{ background: "white", marginTop: "5px", }}
    >
      <NavLink
        to={{
          pathname: "/placeOrder",
          state: {
            allCartItems1: location.state.allCartItems,
            titem1: location.state.titem,
            top1: location.state.top,
            tp1: location.state.tp,
            td1: location.state.td,
            ta1: location.state.ta,
            nam1: item.name,
            addr1: item.street + ", " + item.city + ", " + item.state + " - " + item.pincode,
            mobil1: item.mobileno,
            date3: location.state.date2,
          },
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
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
          <strong>{item.name}</strong>

          <span style={{ marginTop: "5px", marginBottom: "5px" }}>
            {item.street + ", " + item.city + ", " + item.state + " - " + item.pincode}
          </span>
          <strong>+91 {item.mobileno}</strong>
        </div>
      </NavLink>
      <IconButton edge="end" style={{ color: "rgb(228, 37, 69)" }} onClick={() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            axios.post("/deleteaddress", {
              uid: user.uid,
              address_id: item.address_id
            }).then(function (res) {
              loadAddress()
            }).catch(e => {
              console.log(e)
            })
          }
        })
      }}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
      {/* <IconButton edge="end" style={{ color: "rgb(228, 37, 69)" }} onClick={() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            axios.post("/deleteaddress", {
              uid: user.uid,
              address_id: item.address_id
            }).then(function (res) {
              loadAddress()
            }).catch(e => {
              console.log(e)
            })
          }
        })
      }}>
        <EditOutlinedIcon />
      </IconButton> */}
    </div>
  ))


  const vertical = "top";
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
      </Backdrop>
      <div style={{ marginTop: "65px" }}>
        <div style={{ background: "white" }}>
          <Toolbar>
            <Typography variant="h6" className={classes.title} style={{ color: "rgb(228, 37, 69)" }}>
              Select Address
            </Typography>
            <Button variant="contained" onClick={handleClickOpen} style={{ backgroundColor: "rgb(228, 37, 69)", color: "white" }}>
              Add Address
            </Button>
          </Toolbar>
        </div>
        <div>
          {addresslist}
        </div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar} style={{ background: "white" }}>
            <Toolbar>
              <Typography variant="h6" className={classes.title} style={{ color: "rgb(228, 37, 69)" }}>
                Add Address
              </Typography>
              <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" style={{ color: "rgb(228, 37, 69)" }}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <div style={{ padding: "10px" }}>
            {" "}
          </div>
          <div
            style={{
              width: window.innerWidth,
              backgroundColor: "white",
              padding: "10px",
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <input
              type="text"
              style={{
                width: window.innerWidth - 20,
                marginTop: "5px",
                marginBottom: "5px",
                padding: "8px",
                borderRadius: "4px",
              }}
              className="address-input"
              onChange={(e) => {
                setname(e.target.value);
              }}
              value={name}
              placeholder="Name"
              ref={nameRef}
            />

            <input
              type="tel"
              maxLength={10}
              style={{
                width: window.innerWidth - 20,
                marginTop: "5px",
                marginBottom: "5px",
                padding: "8px",
                borderRadius: "4px",
              }}
              className="address-input"
              onChange={(e) => {
                setmobileno(e.target.value);
              }}
              value={mobileno}
              placeholder="Mobile No."
              ref={mobilenoRef}
            />

            <input
              type="text"
              style={{
                width: window.innerWidth - 20,
                marginTop: "5px",
                marginBottom: "5px",
                padding: "8px",
                borderRadius: "4px",
              }}
              className="address-input"
              onChange={(e) => {
                setstreet(e.target.value);
              }}
              value={street}
              placeholder="Address (House No, Building, Street, Area)"
              ref={streetRef}
            />

            <input
              type="tel"
              maxLength={6}
              style={{
                width: window.innerWidth - 20,
                marginTop: "5px",
                marginBottom: "5px",
                padding: "8px",
                borderRadius: "4px",
              }}
              className="address-input"
              onChange={(e) => {
                setpincode(e.target.value);
              }}
              value={pincode}
              placeholder="Pincode"
              ref={pincodeRef}
            />

            <input
              type="text"
              style={{
                width: window.innerWidth - 20,
                marginTop: "5px",
                marginBottom: "5px",
                padding: "8px",
                borderRadius: "4px",
              }}
              className="address-input"
              onChange={(e) => {
                setcity(e.target.value);
              }}
              value={city}
              placeholder="City"
              ref={cityRef}
            />

            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state}
                onChange={handleChange}
                ref={stateRef}
              >
                {allstates.map((item, index) => (
                  <MenuItem value={allstates[index]} key={index}>
                    {allstates[index]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="continue-btn" style={{ width: window.innerWidth }}>
            <Button
              variant="contained"
              className={classes.button}
              style={{
                color: "white",
                backgroundColor: "rgb(228, 37, 69)",
                width: "94%",
              }}
              onClick={() => { saveAddress(); }}
              edge="start" color="inherit" aria-label="close"
            >
              Save Address
            </Button>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Address;
