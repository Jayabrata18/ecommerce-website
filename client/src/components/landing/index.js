import React from "react";
import Navbar from "../general/NavBar";
import Background from "./background";
import Products from "./Products";

const index = () => {
  return (
    <div>
      <Navbar />
      <Background />
      <Products />
    </div>
  );
};

export default index;
