import React from "react";
import footer from "./footer.png";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer>
      <a
        href="http://www.developer.accuweather.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="logo" src={footer} alt="logo" />{" "}
      </a>
    </footer>
  );
};

export default Footer;
