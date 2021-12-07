import React from "react";
import { NavLink } from "react-router-dom";
export const Linkmenuitem = ({ name, gc, cc }) => {
  return (
    <div
      style={{
        fontSize: "14px",
        padding: "10px", cursor: "pointer"
      }}

    >
      <NavLink
        to={{
          pathname: "/products",
          state: {
            gendercoll: gc,
            categorycoll: cc,
          },
        }}
        style={{ textDecoration: "none", color: "black" }}
      >{name}</NavLink>

    </div>
  );
};

const Accordian = ({ h1, id, name, mainid, body }) => {
  return (
    <div className="accordion-item">
      <h4 className="accordion-header" id={h1} >
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${id}`}
          aria-expanded="true"
          style={{ background: "white", color: "black", border: 0, padding: "13px" }}
          aria-controls={id}
        >
          {name}
        </button>
      </h4>
      <div
        id={id}
        className="accordion-collapse collapse"
        aria-labelledby={h1}
        data-bs-parent={`#${mainid}`}
      >
        <div className="accordion-body">{body}</div>
      </div>
    </div>
  );
};

export default Accordian;
