import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ProductsPAge from "./Components/ProductsPAge";
import GenderCategory from "./Components/GenderCategory";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import Address from "./Components/Address";
import PlaceOrder from "./Components/PlaceOrder";
import Orders from "./Components/Orders";
import OrderDetails from "./Components/OrderDetails";
import Wishlist from "./Components/Wishlist";
import Search from "./Components/Search";
import Navbar2 from "./Components/Navbar2";
import Navbar3 from "./Components/Navbar3";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [progress, setprogress] = useState(0);
  const changeprogress = (pr) => {
    setprogress(pr);
  };

  return (
    <div>
      <LoadingBar
        // color="#f11946"
        color="rgb(228, 37, 69)"
        progress={progress}
        onLoaderFinished={() => setprogress(0)}
        shadow={true}
        height={3}
        loaderSpeed={1000}
        className="loadclass"
      />
      <Switch>
        <Route exact path="/">
          <Home changeprogress={changeprogress} />
          <Navbar />
        </Route>

        <Route path="/login">
          <Login changeprogress={changeprogress} />
        </Route>

        <Route path="/products">
          <ProductsPAge changeprogress={changeprogress} />
          <Navbar2 />
        </Route>

        <Route path="/gendercategory">
          <GenderCategory changeprogress={changeprogress} />
          {/* <Navbar /> */}
          <Navbar2 />
        </Route>

        <Route path="/productdetails">
          <ProductDetails changeprogress={changeprogress} />
          <Navbar2 />
          {/* <Navbar style={{ zIndex: "10" }} /> */}
        </Route>

        <Route path="/cart">
          <Cart changeprogress={changeprogress} />
          {/* <Navbar /> */}
          <Navbar2 />
        </Route>

        <Route path="/wishlist">
          <Wishlist changeprogress={changeprogress} />
          <Navbar2 />
          {/* <Navbar /> */}
        </Route>

        <Route path="/address">
          <Address changeprogress={changeprogress} />
          <Navbar2 />
          {/* <Navbar /> */}
        </Route>

        <Route path="/placeOrder">
          <PlaceOrder changeprogress={changeprogress} />
          <Navbar2 />
          {/* <Navbar /> */}
        </Route>

        <Route path="/orders">
          <Orders changeprogress={changeprogress} />
          <Navbar3 />
          {/* <Navbar /> */}
        </Route>

        <Route path="/orderDetails">
          <OrderDetails changeprogress={changeprogress} />
          <Navbar2 />
          {/* <Navbar /> */}
        </Route>


        <Route path="/search">
          <Search changeprogress={changeprogress} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
