import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "./axios";
const GenderCategory = (props) => {
  let location = useLocation();

  const [catcolldet, setcatcolldet] = useState([]);

  const [isl, setisl] = useState(false);


  const loadgenlist = () => {
    props.changeprogress(40)
    axios
      .post("/getgenlist", {
        gencol: location.state.gendercoll1,
      })
      .then(function (res) {
        // console.log(res.data);
        setcatcolldet(res.data);
        setisl(true);
        props.changeprogress(100)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  var list = catcolldet.map((item, index) => (
    <div key={index}>
      <div  style={{ margin: "5px"}} className="genlist-connn">
        <NavLink
          to={{
            pathname: "/products",
            state: {
              gendercoll: location.state.gendercoll1,
              categorycoll: item.catcol,
            },
          }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <img src={item.url} alt="" style={{ width:window.innerWidth<500?"110px":"210px",height:window.innerWidth<500?"140px":"240px" }} />
        </NavLink>
      </div>
    </div>
  ));

  useEffect(() => {
    loadgenlist();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div style={{ height: window.outerHeight, background: "white" }}>
        <h1
          style={{
            background: "white",
            marginTop: "60px",
            textAlign: "center",
          }}
        >
          {location.state.gendercoll1}
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: window.innerWidth,
            height: "auto",
            background: "white",
            padding: "10px",
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: "-8px",
          }}
        >
          {isl ? (
            <>{list}</>
          ) : (
            <>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>
              <div style={{ margin: "4px", marginTop: "10px" }}>
                {" "}
                <Skeleton
                  variant="rect"
                  width={110}
                  height={140}
                  animation="wave"
                />
              </div>

            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GenderCategory;
