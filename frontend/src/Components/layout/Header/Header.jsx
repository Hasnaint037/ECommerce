import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import logo from "../././../../images/logo.png";

export default function Header() {
  return (
    <div>
      <ReactNavbar
        burgerColor="Black"
        burgerColorHover="crimson"
        navColor1="white"
        nav1justifyContent="flex-end"
        logo={logo}
        logoWidth="16vmax"
        logoHeight="12vmax"
        link1Text="Home"
        link2Text="Product"
        link3Text="Contact"
        link4Text="About"
        link1Url="/"
        link2Url="/products"
        link3Url="/contact"
        link4Url="/about"
        link1Margin="1vmax"
        link1Size="1.7vmax"
        link1Color="Black"
        link1ColorHover="crimson"
        link1Transition="0.6"
        profileIcon={true}
        searchIcon={true}
        cartIcon={true}
        profileIconColor="rgba(35, 35, 35, 1)"
        searchIconColor="rgba(35, 35, 35, 1)"
        cartIconColor="rgba(35, 35, 35, 1)"
        searchIconColorHover="crimson"
        cartIconColorHover="crimson"
        profileIconColorHover="crimson"
        searchIconMargin="1vmax"
        cartIconMargin="1vmax"
        SearchIconUrl="/search"
        profileIconMargin="1vmax"
        SearchIconElement={MdSearch}
        CartIconElement={MdShoppingCart}
        ProfileIconElement={MdAccountCircle}
      />
    </div>
  );
}
