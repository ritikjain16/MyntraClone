import React from 'react'
import { NavLink } from "react-router-dom";
import TreeItem from "@material-ui/lab/TreeItem";
const TopMenuItem = ({id,gc,cc,la}) => {
    return (
        <NavLink
        to={{
          pathname: "/products",
          state: {
            gendercoll: gc,
            categorycoll: cc,
          },
        }}
        style={{ textDecoration: "none", color: "black" }}
      >
          <TreeItem nodeId={id} label={la} style={{ padding: "8px" }}></TreeItem>
      </NavLink>
    )
}

export default TopMenuItem
