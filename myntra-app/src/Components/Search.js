import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { useHistory, NavLink } from "react-router-dom";
import axios from "./axios";
const Search = () => {
  const history = useHistory();
  const mysearch = React.useRef(null);
  const [currentSearch, setcurrentSearch] = useState("");

  const [allsearches, setallsearches] = useState([]);
  const [filterallsearches, setfilterallsearches] = useState([]);

  // const loadsearchlist = () => {
  //   var items = [];
  //   firebase
  //     .firestore()
  //     .collection("Search")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.docs.forEach((doc) => {
  //         var obj = {
  //           gencol: doc.data().gencol,
  //           catcol: doc.data().catcol,
  //         };
  //         items.push(obj);
  //       });
  //       setallsearches(items);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const loadsearches = () => {
    axios
      .post("/searches")
      .then(function (res) {
        setallsearches(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    mysearch.current.focus();
    // loadsearchlist();
    loadsearches()
    setfilterallsearches(
      allsearches.filter((search) => {
        return search.catcol
          .replaceAll("_", " ")
          .toLowerCase()
          .includes(currentSearch.toLowerCase());
      })
    );
  }, [currentSearch, allsearches]);

  // const filterlist = allsearches.filter((search) => {
  //   return search.catcol
  //     .replaceAll("_", " ")
  //     .toLowerCase()
  //     .includes(currentSearch.toLowerCase());
  // });

  var list = filterallsearches.map((item, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        alignItems: "center",
        width: window.innerWidth - 20,
      }}
    >
      <div style={{ padding: "4px", marginRight: "3px" }}>
        <SearchIcon
          style={{
            color: "rgb(228, 37, 69)",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        />
      </div>
      <NavLink
        to={{
          pathname: "/products",
          state: {
            gendercoll: item.gencol,
            categorycoll: item.catcol,
          },
        }}
        style={{
          textDecoration: "none",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: window.innerWidth - 20,
        }}
      >
        {item.catcol.replaceAll("_", " ").toLowerCase()}
        <div
          style={{
            padding: "4px",
            marginRight: "3px",
            color: "gray",
            transform: "rotate(50deg)",
          }}
        >
          <ArrowBackIcon />
        </div>
      </NavLink>
    </div>
  ));

  return (
    <>
      <div
        style={{
          width: window.innerWidth,
          background: "white",
          height: "60px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "fixed",
          top: "0px",
          zIndex: 11,
        }}
      >
        <div
          style={{ padding: "4px", marginRight: "3px" }}
          onClick={() => {
            history.goBack();
          }}
        >
          <ArrowBackIcon />
        </div>
        <div style={{ padding: "4px", marginRight: "3px" }}>
          <input
            type="text"
            ref={mysearch}
            style={{
              border: 0,
              outline: 0,
              caretColor: "rgb(228, 37, 69)",
              padding: "5px",
              width: window.innerWidth - 100,
            }}
            value={currentSearch}
            onChange={(e) => {
              setcurrentSearch(e.target.value);
            }}
            placeholder="Search for brands & products"
          />
        </div>
        <div
          style={{ padding: "4px", marginRight: "3px" }}
          onClick={() => {
            setcurrentSearch("");
          }}
        >
          <CancelOutlinedIcon />
        </div>
        {/* <div style={{ padding: "4px", marginRight: "3px" }}>
          <SearchIcon
            style={{
              color: "rgb(228, 37, 69)",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          />
        </div> */}
      </div>
      <div
        style={{
          width: window.innerWidth,
          background: "white",
          height: window.outerHeight,
          padding: "10px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: "62px",
          flexDirection: "column",
        }}
      >
        {list}
      </div>
    </>
  );
};

export default Search;
