import React from "react";
import { MyRipples } from "./MyRipples";
import { NavLink } from "react-router-dom";
const BigImageList = ({ blist }) => {
  var list = blist.map((item, index) => (
    <div key={item._id} className="catlist-img-con1">
      <MyRipples>
        <NavLink
          to={{
            pathname: "/products",
            state: {
              gendercoll: item.gencol,
              categorycoll: item.catcol,
            },
          }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <img src={item.img_url} alt="" className="catlist-img1" />
        </NavLink>
      </MyRipples>
    </div>
  ));

  return (
    <div
      className="category-list-con1"
      style={{ display: blist.length === 0 ? "none" : "flex" }}
    >
      {list}
      {list}
      {list}
    </div>
  );
};

export default BigImageList;
