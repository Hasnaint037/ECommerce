import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function Product({ product }) {
  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <img src={product.image[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
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
      <span>{product.price} &#8360;</span>
    </Link>
  );
}
