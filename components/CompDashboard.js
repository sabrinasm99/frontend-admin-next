import React from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import Router from "next/router";
import jwt_decode from "jwt-decode";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import inBrowser from "../lib/checkInBrowser";
import { Site } from "../config/site";
import store from "./store";
import { logoutUser } from "./actions/authAction";

function CompDashboard() {
  const auth = useSelector((state) => state.auth);
  if (!auth.isAuthenticated) {
    if (inBrowser && localStorage.tokenLS) {
      Axios.post(
        Site.checkToken,
        {},
        {
          headers: {
            Authorization: localStorage.tokenLS || "",
          },
        }
      )
        .then(() => {
          const decoded = jwt_decode(localStorage.tokenLS);
          store.dispatch(setCurrentUser(decoded));
        })
        .catch((err) => {
          Router.push("/");
          logoutUser();
        });
    }
  }
  return (
    <React.Fragment>
      <Navbar />
      <div className="block md:flex">
        <Dashboard />
        <Sidebar />
      </div>
    </React.Fragment>
  );
}

export default CompDashboard;
