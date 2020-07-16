import React from "react";

function Backdrop(props) {
  return (
    <div
      onClick={props.clearAll}
      className={`fixed bg-black opacity-25 h-full w-full z-10 top-0 left-0 ${
        props.backdrop ? "block" : "hidden"
      }`}
    ></div>
  );
}

export default Backdrop;