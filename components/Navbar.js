import React, { useState } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Backdrop from "./Backdrop";
import useBackdrop from "../hooks/useBackdrop";
import { FaHome, FaBell, FaUser, FaSignOutAlt } from "react-icons/fa";
import tw, { styled } from "twin.macro";
import { logoutUser } from "./actions/authAction";

const SearchInSearch = styled.div`
  ${tw`ml-auto p-4 text-purple-800`}
`;

function Navbar() {
  const test = useSelector((state) => state.test);
  const [backdrop, setBackdrop] = useBackdrop();
  const [showAccount, setShowAccount] = useState(false);
  const [activeIcon, setActiveIcon] = useState(1);
  const router = useRouter();

  const onLogout = (event) => {
    event.preventDefault();
    clearAll();
    logoutUser();
    Router.push("/");
  };

  function clearAll() {
    setBackdrop(false);
    setShowAccount(false);
  }

  return (
    <React.Fragment>
      <div
        className={`flex items-center w-full text-purple-800 bg-white top-0 inset-x-0 z-full shadow-md relative`}
      >
        <div className="py-4 pl-4 text-xl font-bold">
          <Link to="/dashboard">{test.title}</Link>
        </div>
        <div className="ml-auto my-auto">
          <div
            className={`${
              activeIcon === 1 && router.pathname === "/dashboard"
                ? "bg-purple-800 text-white sm:bg-white sm:text-purple-800"
                : "text-purple-800 bg-gray-200 sm:bg-white sm:text-gray-400"
            } p-2 sm:p-0 rounded-full sm:rounded-none text-sm sm:text-base sm:text-lg cursor-pointer`}
            onClick={() => {
              clearAll();
              setActiveIcon(1);
              history.push("/dashboard");
            }}
          >
            <FaHome />
          </div>
        </div>

        <div className="my-auto pl-3 sm:pl-6">
          <div
            className={`${
              activeIcon === 2
                ? "bg-purple-800 text-white sm:bg-white sm:text-purple-800"
                : "text-purple-800 bg-gray-200 sm:bg-white sm:text-gray-400"
            } p-2 sm:p-0 rounded-full sm:rounded-none text-sm sm:text-base sm:text-lg cursor-pointer`}
            onClick={() => {
              clearAll();
              setActiveIcon(2);
            }}
          >
            <FaBell />
          </div>
        </div>

        <div className="pr-4 pl-3 sm:pl-6 py-4">
          <div
            className={`${
              activeIcon === 3
                ? "bg-purple-800 text-white sm:bg-white sm:text-purple-800"
                : "text-purple-800 bg-gray-200 sm:bg-white sm:text-gray-400"
            } p-2 sm:p-0 rounded-full sm:rounded-none text-sm sm:text-base sm:text-lg cursor-pointer`}
            onClick={() => {
              clearAll();
              setActiveIcon(3);
              setShowAccount(true);
              setBackdrop(true);
            }}
          >
            <FaUser />
          </div>
        </div>
      </div>

      <div
        className={`${
          showAccount ? "block" : "hidden"
        } fixed text-purple-800 bg-white border-t-4 border-purple-500 left-auto right-0 w-40 h-24 shadow-md p-3 z-50`}
        style={{ top: "61px" }}
      >
        <div className="text-center border-b-2 border-purple-800 text-xl tracking-widest capitalize">
          {localStorage.getItem("name")}
        </div>
        <div
          className="flex items-center py-2 px-1 cursor-pointer"
          onClick={onLogout}
        >
          <div className="pr-2">
            <FaSignOutAlt />
          </div>
          <div className="tracking-wider">Logout</div>
        </div>
      </div>
      <Backdrop
        clearAll={() => {
          clearAll();
          setActiveIcon(1);
        }}
        backdrop={backdrop}
      />
    </React.Fragment>
  );
}

export default Navbar;
