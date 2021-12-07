import React from "react";

const EmptyList = (props) => {
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
      <img src={props.imgu} alt="" style={{ width: window.innerWidth<500?window.innerWidth - 10:"600px" }} />

      <span style={{ color: "rgb(228, 37, 69)", fontSize: "20px",fontWeight:"bold" }}>
        {props.msg}
      </span>
    </div>
  );
};

export default EmptyList;
