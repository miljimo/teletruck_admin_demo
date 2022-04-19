// axios
import axios from "axios";
const baseURL = "https://api.teletruck.org/";

export default axios.create({
  baseURL,
  // You can add your headers here
});
