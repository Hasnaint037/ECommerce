import React, { Fragment, useState, useEffect } from "react";
import ProductCard from "../Home/ProductCard";
import Loader from "../Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../actions/productActions";
import MetaData from "../../Components/layout/MetaData.jsx";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./Products.css";
// import Typography from "@ui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function Products() {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = React.useState([0, 35000]);
  const [category, setCategory] = useState("");

  function valuetext(value) {
    return `${value}/-`;
  }
  const priceHandler = (event, newValue) => {
    setPrice(newValue);
  };

  const { loading, products, resultPerPage, productsCount } = useSelector(
    (state) => state.products
  );
  let setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "machines",
  ];
  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, price, category]);
  return (
    <Fragment>
      {!loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title="Ecommerce"></MetaData>

          <h2 className="products-heading">Products</h2>
          <div className="products">
            {products[0] ? (
              products.map((product) => {
                return (
                  <ProductCard
                    key={product._id}
                    product={product}
                  ></ProductCard>
                );
              })
            ) : (
              <h5 className="no-product-found">No Result Found</h5>
            )}
          </div>
        </Fragment>
      )}
      <div className="filter-box">
        <span className="price">Price</span>
        <Slider
          size="small"
          getAriaLabel={() => "Price Range"}
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          max={35000}
        />
        <span className="category">Categories</span>
        <ul className="category-box">
          {categories.map((category) => {
            return (
              <li
                onClick={() => setCategory(category)}
                className="category-link"
                key={category}
              >
                {category}
              </li>
            );
          })}
        </ul>
      </div>
      {resultPerPage < productsCount ? (
        <div className="pagination-box">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
