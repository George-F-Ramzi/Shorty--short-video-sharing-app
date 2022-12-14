import React from "react";
import Gif from "../assets/spinner.gif";
import "../css/spinner.css";

const Spinner = () => {
  return (
    <div className="spinner">
      <img src={Gif} />
    </div>
  );
};

export default Spinner;
