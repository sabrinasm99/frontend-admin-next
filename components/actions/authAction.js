import { Site } from "../../config/site";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import store from "../store";
export const loginUser = (userData) => {
  Axios.post(Site.loginAdmin, userData)
    .then((res) => {
      const { token, name } = res.data;
      localStorage.setItem("tokenLS", token);
      localStorage.setItem("name", name);
      const decoded = jwt_decode(token);
      store.dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      return {
        type: GET_ERRORS,
        payload: err.response.data,
      };
    });
};

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}
