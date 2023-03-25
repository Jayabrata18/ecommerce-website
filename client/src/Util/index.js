import axios from "axios";
import jwtDecode from "jwt-decode";

const isDevelopment = window.location.hostname.includes("localhost");

const getServer = () => {
  return isDevelopment
    ? "http://localhost:5000"
    : "https://eshop-292223.wl.r.appspot.com";
};

const decodeUser = () => {
  const token = localStorage.getItem("token");
  return jwtDecode(token);
};

export { getServer, decodeUser };
