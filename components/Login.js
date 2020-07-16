import React, { useState } from "react";
import Router from "next/router";
import { useSelector } from 'react-redux';
import inBrowser from "../lib/checkInBrowser";
import { loginUser } from "./actions/authAction";
function Login() {
  const auth = useSelector(state => state.auth)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeInputPassword = (event) => {
    setPassword(event.target.value);
  };

  const changeInputUsername = (event) => {
    setUsername(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username: username,
      password: password,
    };
    loginUser(userData);
  };

  if (inBrowser && localStorage.tokenLS) {
    if (auth.isAuthenticated) {
      Router.push("/dashboard");
    }
  }
  return (
    <React.Fragment>
      <div className="h-screen flex justify-center items-center">
        <div
          className="flex rounded-lg mx-8 sm:mx-40 md:mx-0 shadow-lg bg-white md:h-px380"
          style={{ width: "650px" }}
        >
          <div className="hidden md:block w-1/2 p-4">
            <img src="/undraw_publish.svg" className="h-full" />
          </div>
          <div className="p-5 sm:p-6 w-full flex flex-col md:w-1/2">
            <h1 className="mb-12 md:mt-4 text-3xl text-center text-purple-800 font-extrabold">
              Login Admin
            </h1>
            <form onSubmit={onSubmit}>
              <input
                value={username}
                onChange={changeInputUsername}
                type="text"
                placeholder="Username"
                className="rounded-lg p-1 w-full mb-4 pl-3 focus:outline-none"
                style={{ backgroundColor: "#edf2f7" }}
              />
              <input
                type="password"
                value={password}
                name="password"
                onChange={changeInputPassword}
                placeholder="Password"
                className="rounded-lg p-1 w-full pl-3 mb-8 focus:outline-none"
                style={{ backgroundColor: "#edf2f7" }}
              />
              <button
                className="focus:outline-none bg-purple-800 hover:bg-purple-600 text-white font-bold block p-2 rounded-lg w-full tracking-widest"
                type="submit"
                onClick={onSubmit}
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
