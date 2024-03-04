import React, { Fragment, useEffect } from "react";
import { productDetails } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../Loader/Loader.jsx";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.productDetails);
  const params = useParams();
  useEffect(() => {
    dispatch(productDetails(params.id));
  }, []);
  return (
    <Fragment>
      {!loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <div className="product-details">
            <div className="hellog">
              <Carousel>
                {product.image &&
                  product.image.map((image, i) => (
                    <img
                      src={image.url}
                      className="image"
                      key={image.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="hello">
              <div className="block-1">
                <h2>{product.name}</h2>
                <p>ID-{product._id}</p>
              </div>
              <div className="block-2">
                <ReactStars
                  edit={false}
                  activeColor="tomato"
                  color="rgba(20,20,20,0.1)"
                  size={window.innerWidth < 600 ? 20 : 25}
                  value={product.ratings}
                  isHalf={true}
                />
                <span>({product.numberOfReviews} Reviews)</span>
              </div>
              <div className="block-3">
                <h1>{product.price}</h1>
                <div className="block-3-1">
                  <div className="block-3-1-1">
                    <button>-</button>
                    <input type="text" />
                    <button>+</button>
                  </div>
                  <button>Add To Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.stock < 1 ? "red" : "green"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="block-4">Description : {product.description}</div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="product-reviews">Reviews</h3>
          <div className="review-container">
            {product.reviews && product.reviews[0] ? (
              product.reviews.map((review) => {
                return (
                  <ReviewCard review={review} key={review.user}></ReviewCard>
                );
              })
            ) : (
              <p className="no-reviews">No Reviews Yet</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
