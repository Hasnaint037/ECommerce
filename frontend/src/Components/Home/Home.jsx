import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import Product from "./ProductCard.jsx";
import "./Home.css";
import MetaData from "../layout/MetaData.jsx";
import { getProducts } from "../../actions/productActions.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <Fragment>
      {!loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title="Ecommerce"></MetaData>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll<CgMouse></CgMouse>{" "}
              </button>
            </a>
          </div>
          <h2 className="home-heading">Feature Product</h2>
          <div id="container">
            {products &&
              products.map((product) => {
                return <Product product={product} key={product._id}></Product>;
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
