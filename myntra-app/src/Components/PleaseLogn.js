import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import loginimg from "../Images/loginimg.jpg";
const PleaseLogn = () => {
  return (
    <div
      style={{
        marginTop: "60px",
        padding: "10px",
        background: "white",
        width: window.innerWidth,
        height: window.outerHeight - 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img src={loginimg} alt="" style={{ width: window.innerWidth - 50 }} />
      <NavLink to="/login" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          style={{ color: "white", background: "rgb(228, 37, 69)" }}
        >
          Sign Up / Login
        </Button>
      </NavLink>
    </div>
  );
};

export default PleaseLogn;
