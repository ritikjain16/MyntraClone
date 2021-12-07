import React from "react";
import { NavLink } from "react-router-dom";
import { MyRipples } from "./MyRipples";

const CategoryList = ({ clist }) => {
  var list = clist.map((item, index) => (
    <div key={item._id} className="catlist-img-con">
      <MyRipples>
        <NavLink
          to={{
            pathname: "/gendercategory",
            state: {
              gendercoll1: item.cat_name,
            },
          }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <img src={item.img_url} alt={item.cat_name} className="catlist-img"/>
          {/* <span>{item.cat_name}</span> */}
        </NavLink>
      </MyRipples>
    </div>
  ));

  

  return <div className="category-list-con">{list}</div>;
};

export default CategoryList;
