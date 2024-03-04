import React from 'react';
import PlayStore from "../../../images/playStore.png";
import AppStore from "../../../images/AppStore.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer id='footer'>
      <div className='left-footer'>
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download app for android and ios mobile phones</p>
        <img src={PlayStore} alt="playstore" />
        <img src={AppStore} alt="appstore" />
      </div>
      <div className='middle-footer'>
        <h1>ECOMMERCE</h1>
        <p>High quality is our first priority</p>
        <p>Copyrights 2024 &copy; MeHasnainTariq </p>
      </div>
      <div className='right-footer'>
        <h4>Follow Us</h4>
        <a href="">Facebook</a>
        <a href="">Instagram</a>
        <a href="">Twitter</a>
      </div>
    </footer>
  )
}
