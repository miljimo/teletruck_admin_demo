// axios
import axios from "axios";

// Automatical https://api.teletruck.org/"

var baseURL = process.env.API_BASE_URL
 
if (!process.env.API_BASE_URL) {
  baseURL = 'http://api.teletruck.local:8000';
}


console.log(`Base url=${baseURL}`)

export default axios.create({
  baseURL:baseURL,
  // You can add your headers here
});
