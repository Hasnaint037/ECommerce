import React, { useState } from "react";
import "./Search.css";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  let navigate = useNavigate();
  let SubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <div>
      <MetaData title="Search A Product --- Ecommerce"></MetaData>
      <form action="" className="search-box" onSubmit={SubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}
