import React, { useState } from "react";
import { Site } from "../config/site";
import Axios from "axios";

function Add() {
  const [input, setInput] = useState({ name: "", price: "" });
  const [fileObj, setFileObj] = useState(null);
  const [fileblob, setFileblob] = useState(null);
  const [message, setMessage] = useState('');

  const onChangeInput = (event) => {
    const newInput = {
      ...input,
      [event.target.name]: event.target.value,
    };
    setInput(newInput);
  };

  const onChangeImage = (event) => {
    let [file] = event.target.files;
    if (file) {
      setFileblob(URL.createObjectURL(file));
      setFileObj(file);
    } else {
      setFileblob(null);
      setFileObj(null);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("productImage", fileObj);
    formData.append("name", input.name);
    formData.append("price", input.price);
    Axios.post(`${Site.uploadProduct}`, formData).then((res) => {
      Axios.get(`${Site.getProduct}`).then((res) => {
        const newInput = {
          name: "",
          price: "",
        };
        setInput(newInput);
        setFileObj(null);
        setFileblob(null);
        setMessage(res.data.message);
      });
    });
  };

  return (
    <React.Fragment>
      <div className="w-full sm:w-4/5 p-3 mx-0 sm:mx-auto">
        <div className="px-3">
          <div className="font-bold text-lg sm:text-xl md:text-2xl">
            Add Product
          </div>
          <hr />

          <form onSubmit={onSubmit} className="w-full  mt-3">
            <div className="block md:flex">
              <div className="w-full md:w-1/2 pr-1">
                <label className="block">Name :</label>
                <input
                  type="text"
                  className=" form-control border-solid border border-gray-300 block w-full p-1 pl-3 focus:outline-none"
                  value={input.name}
                  onChange={onChangeInput}
                  name="name"
                />

                <label className="block">Price :</label>
                <input
                  type="text"
                  className="form-control border-solid border border-gray-300 block w-full p-1 pl-3 focus:outline-none"
                  value={input.price}
                  onChange={onChangeInput}
                  name="price"
                />
                <br />
              </div>
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
                className="w-full md:w-1/2 pl-1"
              >
                <label className="font-semibold focus:outline-none">
                  Upload Image
                </label>
                {fileblob !== null ? (
                  <img src={fileblob} style={{ width: "100%" }} alt="product" />
                ) : (
                  <div
                    style={{
                      backgroundColor: "lightgray",
                      width: "100%",
                      height: "15em",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "grey",
                        fontSize: "2em",
                        letterSpacing: "3px",
                        fontWeight: 400,
                      }}
                      className="px-1"
                    >
                      PREVIEW IMAGE
                    </span>
                  </div>
                )}

                <br />
                <div className="form-group">
                  <input
                    onChange={onChangeImage}
                    className="form-control-file"
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <button
              style={{ minWidth: 0 }}
              className="focus:outline-none mt-4 w-full p-1 bg-purple-800 text-white text-lg font-semibold hover:bg-purple-600 tracking-widest"
              type="submit"
              onClick={onSubmit}
            >
              ADD PRODUCT
            </button>
          </form>
          {message}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Add;
