import React, { useState, useEffect } from "react";
import BigImageList from "./BigImageList";
import CategoryList from "./CategoryList";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "./axios";
import { NavLink } from "react-router-dom";

const Home = (props) => {
  const [img1, setimg1] = useState("");
  const [img2, setimg2] = useState("");

  const [catlist, setcatlist] = useState([]);
  const [biglist, setbiglist] = useState([]);
  const [biglist1, setbiglist1] = useState([]);
  const [biglist2, setbiglist2] = useState([]);
  const [biglist3, setbiglist3] = useState([]);
  const [biglist4, setbiglist4] = useState([]);
  const [biglist5, setbiglist5] = useState([]);
  
  const [isc, setisc] = useState(false);
  const [isb, setisb] = useState(false);
  const [isb1, setisb1] = useState(false);
  const [isb2, setisb2] = useState(false);
  const [isb3, setisb3] = useState(false);
  const [isb4, setisb4] = useState(false);
  const [isb5, setisb5] = useState(false);
  
  async function loadcatlist() {
    props.changeprogress(10);
    const req = await axios.get("/catlist");
    setcatlist(req.data);
    setisc(true);
    props.changeprogress(20);
  }
  
  const loadbiglist = (gc) => {
    props.changeprogress(60);
    axios
    .post("/getbiglist", {
      gencol: gc,
    })
    .then(function (res) {
      if (gc === "MEN") {
        setbiglist(res.data.reverse());
        setisb(true);
      } else if (gc === "WOMEN") {
        setbiglist1(res.data);
        setisb1(true);
      } else if (gc === "KIDS") {
        setbiglist2(res.data);
        setisb2(true);
      } else if (gc === "HOME") {
        setbiglist3(res.data);
        setisb3(true);
      } else if (gc === "BEAUTY") {
        setbiglist4(res.data);
        setisb4(true);
      } else if (gc === "FOOTWEAR") {
        setbiglist5(res.data);
          setisb5(true);
        }
        props.changeprogress(100);
      })
      .catch((e) => {
        console.log(e);
      });
    };
    
    const getimages = () => {
      props.changeprogress(30);
      axios
      .post("/getmainimage")
      .then(function (res) {
        props.changeprogress(40);
        setimg1(res.data[0].img_url);
        setimg2(res.data[1].img_url);
        props.changeprogress(50);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    loadcatlist();
    getimages();
    loadbiglist("MEN");
    loadbiglist("WOMEN");
    loadbiglist("KIDS");
    loadbiglist("HOME");
    loadbiglist("BEAUTY");
    loadbiglist("FOOTWEAR");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home-class-con">
      {isc ? (
        <>
          {" "}
          <CategoryList clist={catlist} />
        </>
      ) : (
        <>
          <div className="skt" style={{ padding: "1px" }}>
            <div style={{ margin: "8px", marginTop: "10px" }}>
              {" "}
              <Skeleton
                variant="circle"
                width={70}
                height={70}
                animation="wave"
              />
            </div>
            <div style={{ margin: "8px", marginTop: "10px" }}>
              {" "}
              <Skeleton
                variant="circle"
                width={70}
                height={70}
                animation="wave"
              />
            </div>
            <div style={{ margin: "8px", marginTop: "10px" }}>
              {" "}
              <Skeleton
                variant="circle"
                width={70}
                height={70}
                animation="wave"
              />
            </div>
            <div style={{ margin: "8px", marginTop: "10px" }}>
              {" "}
              <Skeleton
                variant="circle"
                width={70}
                height={70}
                animation="wave"
              />
            </div>
            <div style={{ margin: "8px", marginTop: "10px" }}>
              {" "}
              <Skeleton
                variant="circle"
                width={70}
                height={70}
                animation="wave"
              />
            </div>
            <div style={{ margin: "8px", marginTop: "10px" }}>
              {" "}
              <Skeleton
                variant="circle"
                width={70}
                height={70}
                animation="wave"
              />
            </div>
          </div>
        </>
      )}

      <div
        className="mainimg"
        width={window.innerWidth}
        style={{ display: "flex" }}
      >
        <div style={{ width: window.innerWidth / 2 }}>
          <NavLink
            to={{
              pathname: "/gendercategory",
              state: { gendercoll1: "MEN" },
            }}
          >
            <img src={img1} alt="" className="mainimg" />
          </NavLink>
        </div>
        <div style={{ width: window.innerWidth / 2 }}>
          <NavLink
            to={{
              pathname: "/gendercategory",
              state: { gendercoll1: "WOMEN" },
            }}
          >
            <img src={img2} alt="" className="mainimg" />
          </NavLink>
        </div>
      </div>
      {isb || isb1 || isb2 || isb3 || isb4 || isb5 ? (
        <>
          {" "}
          <BigImageList blist={biglist} />
          <BigImageList blist={biglist1} />
          <BigImageList blist={biglist2} />
          <BigImageList blist={biglist3} />
          <BigImageList blist={biglist4} />
          <BigImageList blist={biglist5} />
          <BigImageList blist={biglist} />
          <BigImageList blist={biglist1} />
          <BigImageList blist={biglist2} />
          <BigImageList blist={biglist3} />
          <BigImageList blist={biglist4} />
          <BigImageList blist={biglist5} />
          <BigImageList blist={biglist} />
          <BigImageList blist={biglist1} />
          <BigImageList blist={biglist2} />
          <BigImageList blist={biglist3} />
          <BigImageList blist={biglist4} />
          <BigImageList blist={biglist5} />
          <BigImageList blist={biglist} />
          <BigImageList blist={biglist1} />
          <BigImageList blist={biglist2} />
          <BigImageList blist={biglist3} />
          <BigImageList blist={biglist4} />
          <BigImageList blist={biglist5} />
          <BigImageList blist={biglist} />
          <BigImageList blist={biglist1} />
          <BigImageList blist={biglist2} />
          <BigImageList blist={biglist3} />
          <BigImageList blist={biglist4} />
          <BigImageList blist={biglist5} />
          <BigImageList blist={biglist} />
          <BigImageList blist={biglist1} />
          <BigImageList blist={biglist2} />
          <BigImageList blist={biglist3} />
          <BigImageList blist={biglist4} />
          <BigImageList blist={biglist5} />
        </>
      ) : (
        <>
        {/* <div style={{marginTop:"-28px"}}>
              <Skeleton
                variant="rect"
                width={window.innerWidth}
                height={300}
                animation="wave"
              />
            </div> */}
          <div className="skt" style={{ marginBottom: "10px" }}>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
          </div>
          <div className="skt" style={{ marginBottom: "10px" }}>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
          </div>
          <div className="skt" style={{ marginBottom: "10px" }}>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
            <div style={{ margin: "6px" }}>
              <Skeleton
                variant="rect"
                width={140}
                height={180}
                animation="wave"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
