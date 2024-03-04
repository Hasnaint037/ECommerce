import React from "react";
import Profile from "../.././images/Profile.png";
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";

export default function ReviewCard({ review }) {
  return (
    <div>
      <div className="review-card">
        <img src={Profile} alt="User" />
        <p>{review.name}</p>
        <ReactStars
          edit={false}
          activeColor="tomato"
          color="rgba(20,20,20,0.1)"
          size={window.innerWidth < 600 ? 20 : 25}
          isHalf={true}
          value={4.5}
        />
        <span>{review.comment}</span>
      </div>
    </div>
  );
}
