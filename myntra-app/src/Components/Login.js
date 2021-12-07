import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { NavLink } from "react-router-dom";
import firebase from "../firebaseconn";
import loginimg from "../Images/loginimg.jpg";
import { Backdrop, Snackbar } from "@material-ui/core";
import axios from "./axios";
import gimg from "../Images/googleimg.png";
import gitimg from "../Images/gith.png";
import twimg from "../Images/twimg.png";
const Login = (props) => {
  const [number, setnumber] = useState("");
  const [isOTPsend, setisOTPsend] = useState(false);


  const [codeResult, setcodeResult] = useState(0);
  const [backdrop, setbackdrop] = useState(false);

  const numInputRef = React.useRef(null);
  const [snopen, setsnopen] = useState(false);
  const [snackbarmess, setsnackbarmess] = useState(
    "Address Saved Successfully"
  );

  const [o1, seto1] = useState("");
  const [o2, seto2] = useState("");
  const [o3, seto3] = useState("");
  const [o4, seto4] = useState("");
  const [o5, seto5] = useState("");
  const [o6, seto6] = useState("");

  const o1ref = React.useRef(null);
  const o2ref = React.useRef(null);
  const o3ref = React.useRef(null);
  const o4ref = React.useRef(null);
  const o5ref = React.useRef(null);
  const o6ref = React.useRef(null);

  useEffect(() => {
    props.changeprogress(25);
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: function (response) { },
        "expired-callback": function () { },
      }
    );
    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId;
      props.changeprogress(100);
    });
    // eslint-disable-next-line
  }, []);

  const sendOtp = () => {
    if (number.length === 10) {
      props.changeprogress(25);
      setbackdrop(true);
      var numb = "+91" + number;
      firebase
        .auth()
        .signInWithPhoneNumber(numb, window.recaptchaVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setcodeResult(confirmationResult);
          //   otpInputRef.current.focus();
          setbackdrop(false);
          setsnackbarmess(`Otp has been sent to ${numb}`);
          setisOTPsend(true);
          o1ref.current.focus();
          props.changeprogress(100);
          setsnopen(true);
          setTimeout(() => {
            setsnopen(false);
          }, 2000);
        })
        .catch(function (err) {
          setbackdrop(false);
          setsnackbarmess(`${err.message}`);
          props.changeprogress(100);
          setsnopen(true);
          setTimeout(() => {
            setsnopen(false);
          }, 2000);
        });
    } else {
      setbackdrop(false);
      setsnackbarmess(`Please enter a valid 10 digit number`);
      numInputRef.current.focus();
      setsnopen(true);
      setTimeout(() => {
        setsnopen(false);
      }, 2000);
    }
  };

  const login = () => {
    var newotp = o1 + o2 + o3 + o4 + o5 + o6;
    if (newotp.length === 6) {
      setbackdrop(true);
      props.changeprogress(25);
      var code = newotp;
      codeResult
        .confirm(code)
        .then(function (result) {
          const user = firebase.auth().currentUser;
          if (user) {
            var uid = user.uid;
            props.changeprogress(50);
            axios
              .post("/login", {
                uid: uid,
                number: "+91" + number,
                photoUrl: "",
              })
              .then(function (response) {
                // console.log(response.data);
                setbackdrop(false);
                props.changeprogress(100);
                setsnackbarmess(`Login Successful`);
                setsnopen(true);
                window.location = "/";
              })
              .catch((e) => {
                console.log(e);
                props.changeprogress(100);
              });
          } else {
            setbackdrop(false);
            setsnackbarmess(`Please Log In`);
            setsnopen(true);
            props.changeprogress(100);
            setTimeout(() => {
              setsnopen(false);
            }, 2000);
          }
        })
        .catch((e) => {
          setbackdrop(false);
          props.changeprogress(100);
          setsnackbarmess(`Please enter a valid 6 digit OTP`);
          setsnopen(true);
          setTimeout(() => {
            setsnopen(false);
          }, 2000);
        });
    } else {
      setbackdrop(false);
      props.changeprogress(100);
      setsnackbarmess(`Please enter a valid 6 digit OTP`);
      setsnopen(true);
      setTimeout(() => {
        setsnopen(false);
      }, 2000);
    }
  };

  const googlesignin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        axios
          .post("/login", {
            uid: result.user.uid,
            number: result.user.email,
            photoUrl: result.user.photoURL,
          })
          .then(function (response) {
            // console.log(response.data);
            setbackdrop(false);
            props.changeprogress(100);
            setsnackbarmess(`Login Successful`);
            setsnopen(true);
            window.location = "/";
          })
          .catch((e) => {
            console.log(e);
            props.changeprogress(100);
          });
      })
      .catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const githubsignin = () => {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        axios
          .post("/login", {
            uid: result.user.uid,
            number: result.user.email,
            photoUrl: result.user.photoURL,
          })
          .then(function (response) {
            setbackdrop(false);
            props.changeprogress(100);
            setsnackbarmess(`Login Successful`);
            setsnopen(true);
            window.location = "/";
          })
          .catch((e) => {
            console.log(e);
            props.changeprogress(100);
          });
      })
      .catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const twittersignin = () => {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        axios
          .post("/login", {
            uid: result.user.uid,
            number: result.additionalUserInfo.username,
            photoUrl: result.user.photoURL,
          })
          .then(function (response) {
            setbackdrop(false);
            props.changeprogress(100);
            setsnackbarmess(`Login Successful`);
            setsnopen(true);
            window.location = "/";
          })
          .catch((e) => {
            console.log(e);
            props.changeprogress(100);
          });
      })
      .catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const handleKeypressotp = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      console.log("chdskvs")
      sendOtp();
    }
  };

  const handleKeypresslogin = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      login()
    }
  };

  const vertical = "top";
  const horizontal = "center";

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snopen}
        //   onClose={handleClose}
        message={snackbarmess}
        key={vertical + horizontal}
        style={{ marginTop: "50px" }}
      />
      <Backdrop
        style={{ color: "rgb(228, 37, 69)", zIndex: "10" }}
        open={backdrop}
      >
        {/* <CircularProgress color="rgb(228, 37, 69)" /> */}
      </Backdrop>
      {!isOTPsend ? (
        <div style={{ display: "block" }}>
          <img
            src="https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2021/7/9/da75002d-5bbd-4e5d-91cb-6cb4f481900c1625769349241-Banner_Hamburger_400.png"
            alt=""
            className="login-signup-img"
          />
          <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
            <ArrowBackIcon
              style={{ position: "fixed", top: "15px", left: "20px" }}
            />
          </NavLink>
          <div className="login-con" style={{ height: window.outerHeight }}>
            <div className="login-or-signup-con">
              <span className="login-or-signup-text">Login</span> or{" "}
              <span className="login-or-signup-text">Signup</span>
              <div className="num-con">
                <span>+91 | </span>
                <input
                  ref={numInputRef}
                  type="tel"
                  maxLength={10}
                  placeholder="Mobile Number"
                  className="input-mobile"
                  value={number}
                  onChange={(e) => {
                    setnumber(e.target.value);
                  }}
                  onKeyPress={handleKeypressotp}
                />
              </div>
              <div id="recaptcha-container" className="recaptcha"></div>
              <div className="privacy-con">
                By Continuing, I agree to{" "}
                <span className="pink-text">Terms of Use</span> &amp;
                <span className="pink-text"> Privacy Policy</span>
              </div>
              <div
                className="privacy-con1 rounded"
                onClick={sendOtp}
                id="send-otp"
              >
                <span>CONTINUE</span>
              </div>
              <div
                className="border border-black my-3 p-2 rounded d-flex justify-content-center align-items-center"
                onClick={googlesignin}
              >
                <img
                  src={gimg}
                  alt=""
                  className="mx-2"
                  style={{ width: "25px" }}
                />
                <span>Sign in with Google</span>
              </div>
              <div
                className="border border-black my-3 p-2 rounded d-flex justify-content-center align-items-center"
                onClick={twittersignin}
              >
                <img
                  src={twimg}
                  alt=""
                  className="mx-2"
                  style={{ width: "25px" }}
                />
                <span>Sign in with Twitter</span>
              </div>
              <div
                className="border border-black my-3 p-2 rounded d-flex justify-content-center align-items-center"
                onClick={githubsignin}
              >
                <img
                  src={gitimg}
                  alt=""
                  className="mx-2"
                  style={{ width: "25px" }}
                />
                <span>Sign in with Github</span>
              </div>
              <div className="privacy-con">
                Have trouble logging in ?
                <span className="pink-text"> Get Help</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "white",
            height: window.outerHeight,
            paddingRight: "15px",
            paddingLeft: "15px",
          }}
        >
          <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
            <ArrowBackIcon
              style={{ position: "fixed", top: "15px", left: "20px" }}
            />
          </NavLink>

          <img src={loginimg} alt="" style={{ paddingTop: "10px" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              ref={o1ref}
              type="tel"
              maxLength={1}
              className="input-mobile2"
              value={o1}
              onChange={(e) => {
                seto1(e.target.value);
              }}
              onKeyUp={() => {
                if (o1.length === 1) {
                  o2ref.current.focus();
                }
              }}
            />
            <input
              ref={o2ref}
              type="tel"
              maxLength={1}
              className="input-mobile2"
              value={o2}
              onChange={(e) => {
                seto2(e.target.value);
              }}
              onKeyUp={() => {
                if (o2.length === 1) {
                  o3ref.current.focus();
                }
              }}
            />
            <input
              ref={o3ref}
              type="tel"
              maxLength={1}
              className="input-mobile2"
              value={o3}
              onChange={(e) => {
                seto3(e.target.value);
              }}
              onKeyUp={() => {
                if (o3.length === 1) {
                  o4ref.current.focus();
                }
              }}
            />
            <input
              ref={o4ref}
              type="tel"
              maxLength={1}
              className="input-mobile2"
              value={o4}
              onChange={(e) => {
                seto4(e.target.value);
              }}
              onKeyUp={() => {
                if (o4.length === 1) {
                  o5ref.current.focus();
                }
              }}
            />
            <input
              ref={o5ref}
              type="tel"
              maxLength={1}
              className="input-mobile2"
              value={o5}
              onChange={(e) => {
                seto5(e.target.value);
              }}
              onKeyUp={() => {
                if (o5.length === 1) {
                  o6ref.current.focus();
                }
              }}
            />
            <input
              ref={o6ref}
              type="tel"
              maxLength={1}
              className="input-mobile2"
              value={o6}
              onChange={(e) => {
                seto6(e.target.value);
              }}
              onKeyPress={handleKeypresslogin}
            />
          </div>

          <div className="privacy-con1 rounded" onClick={login}>
            <span>VERIFY OTP</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
