// axios
import axios from "axios";
const baseURL = "https://teletruck-api.herokuapp.com/";

export default axios.create({
  baseURL,
  // You can add your headers here
});
