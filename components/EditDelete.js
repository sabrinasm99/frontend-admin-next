import React, { useState, useEffect } from "react";
import { Site } from "../config/site";
import Axios from "axios";
import { FaRegTimesCircle, FaEdit, FaTrash } from "react-icons/fa";

function EditDelete() {
  const [products, setProducts] = useState([]);
  const [currentEdit, setCurrentEdit] = useState({
    _id: "",
    name: "",
    price: "",
    image: "",
    fileObj: null,
    fileblob: null,
  });
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const result = await Axios.get(Site.getProduct);
      setProducts(result.data);
    };

    getData();
  }, []);

  const editProductOnClick = (id) => {
    Axios.get(`${Site.getProduct}/${id}`)
      .then((res) => {
        const { _id, name, price, image } = res.data;
        setShowEditMenu(true);
        const newCurrentEdit = {
          ...currentEdit,
          _id,
          name,
          price,
          image,
        };
        setCurrentEdit(newCurrentEdit);
      })
      .catch((err) => console.log(err));
  };

  const onChangeInputEdit = (event) => {
    const newCurrentEdit = {
      ...currentEdit,
      [event.target.name]: event.target.value,
    };
    setCurrentEdit(newCurrentEdit);
    console.log(setCurrentEdit, "SET CURRENT EDIT");
  };

  const onChangeFile = (event) => {
    let [file] = event.target.files;
    console.log(file);
    if (file !== undefined) {
      const newCurrentEdit = {
        ...currentEdit,
        fileObj: file,
        fileblob: URL.createObjectURL(file),
      };
      setCurrentEdit(newCurrentEdit);
    } else {
      const newCurrentEdit = {
        ...currentEdit,
        fileObj: null,
        fileblob: null,
      };
      setCurrentEdit(newCurrentEdit);
    }
  };

  const onCancelEdit = () => {
    setShowEditMenu(false);
    const newCurrentEdit = {
      ...currentEdit,
      fileObj: null,
      fileblob: null,
    };
    setCurrentEdit(newCurrentEdit);
  };

  const onSaveEdit = () => {
    let formData = new FormData();
    formData.append("name", currentEdit.name);
    formData.append("price", currentEdit.price);
    if (currentEdit.fileObj !== undefined || currentEdit.fileObj !== null)
      formData.append("productImage", currentEdit.fileObj);
    Axios.put(`${Site.updateProduct}/${currentEdit._id}`, formData)
      .then((res) => {
        console.log(res.data, "Product Updated");
        Axios.get(`${Site.getProduct}`)
          .then((res) => {
            setProducts(res.data);
            setShowEditMenu(false);
            const newCurrentEdit = {
              ...currentEdit,
              fileObj: null,
              fileblob: null,
            };
            setCurrentEdit(newCurrentEdit);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  let editMenu = null;
  let src = `${Site.ori}/${currentEdit.image}`;
  console.log(currentEdit.image);
  if (currentEdit.fileObj !== null) {
    src = currentEdit.fileblob;
  }

  if (showEditMenu)
    editMenu = (
      <React.Fragment>
        <div
          style={{
            overflowY: "auto",
            position: "fixed",
            zIndex: 200,
            transform: "translate(-50%,-50%)",
            backgroundColor: "white",
            boxShadow: "1px 1px 5px black",
            left: "50%",
            top: "50%",
            padding: "20px",
            backfaceVisibility: "hidden",
          }}
        >
          <div style={{ display: "flex" }}>
            <div>
              <h2 className="font-semibold text-lg">Edit Menu</h2>
            </div>
            <div
              className="text-purple-800 cursor-pointer"
              style={{ marginLeft: "auto" }}
            >
              <FaRegTimesCircle onClick={onCancelEdit} />
            </div>
          </div>
          <hr />
          <div className="form-group flex mt-3">
            <label className="w-1/4">Name</label>
            <input
              className="form-control w-3/4 border border-solid border-purple-800 pl-1 focus:outline-none"
              type="text"
              name="name"
              value={currentEdit.name}
              onChange={onChangeInputEdit}
            />
          </div>
          <div className="form-group flex mt-1">
            <label className="w-1/4">Price</label>
            <input
              className="form-control w-3/4 border border-solid border-purple-800 pl-1 focus:outline-none"
              type="number"
              name="price"
              value={currentEdit.price}
              onChange={onChangeInputEdit}
            />
          </div>
          <div className="form-group">
            <div>Picture</div>
            <img
              alt="product"
              style={{ width: "100px", height: "100px" }}
              src={src}
            />

            <input
              className="form-control-file"
              style={{ verticalAlign: "bottom" }}
              onChange={onChangeFile}
              type="file"
            />
          </div>
          <div className="form-group mt-3">
            <button
              onClick={onSaveEdit}
              className="btn btn-warning p-1 px-3 bg-purple-800 text-white focus:outline-none border border-purple-800"
            >
              Save
            </button>
            <button
              onClick={onCancelEdit}
              className="btn btn-primary ml-1 p-1 px-3 border border-purple-800 font-semibold text-purple-800 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
        <div
          onClick={onCancelEdit}
          style={{
            position: "fixed",
            zIndex: 199,
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      </React.Fragment>
    );

  const deleteProductOnClick = (id) => {
    Axios.get(`${Site.getProduct}/${id}`)
      .then((res) => {
        const { _id, name } = res.data;
        setShowDeleteMenu(true);
        const newCurrentEdit = {
          ...currentEdit,
          _id,
          name,
        };
        setCurrentEdit(newCurrentEdit);
      })
      .catch((err) => console.log(err));
  };

  const deleteProductConfirm = (id) => {
    Axios.delete(`${Site.removeProduct}/${id}`)
      .then((msg) => {
        console.log(msg.data);
        Axios.get(`${Site.getProduct}`)
          .then((res) => {
            setShowDeleteMenu(false);
            setProducts(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const deleteProductCancel = () => {
    setShowDeleteMenu(false);
  };

  let deleteMenu = null;
  if (showDeleteMenu) {
    deleteMenu = (
      <div>
        <div
          style={{
            position: "fixed",
            backgroundColor: "white",
            zIndex: 301,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "300px",
            padding: "10px",
          }}
        >
          <h2 className="text-warning font-semibold text-lg">Warning</h2>
          <hr />
          <p className="mt-3">
            You <strong style={{ color: "red" }}>cannot</strong> undo deletion
            process.
          </p>
          <p>
            Do you want to delete{" "}
            <strong className="text-purple-800">{currentEdit.name}</strong>?
          </p>
          <div style={{ textAlign: "right" }} className="mt-3">
            <button
              onClick={() => deleteProductConfirm(currentEdit._id)}
              // style={{ padding: "10px 30px" }}
              className="btn btn-warning mr-1 p-1 px-3 bg-purple-800 border border-purple-800 text-white focus:outline-none"
            >
              Yes
            </button>
            <button
              onClick={deleteProductCancel}
              // style={{ padding: "10px 30px" }}
              className="btn btn-info p-1 px-3 text-purple-800 border border-purple-800 font-semibold focus:outline-none"
            >
              No
            </button>
          </div>
        </div>
        <div
          onClick={deleteProductCancel}
          style={{
            position: "fixed",
            zIndex: 300,
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      </div>
    );
  }

  let productList = null;
  if (products.length > 0) {
    productList = products.map((val) => {
      console.log(products, "ini products");
      return (
        <div key={val._id}>
          <div className="hidden sm:flex w-full p-1">
            <div className="flex w-1/3 ">
              <img
                src={`${Site.ori}/${val.image}`}
                className=" m-auto w-1/3 inline"
                style={{ height: "50px", width: "50px" }}
                alt={val.name}
              />
              <h6 className="w-2/3 m-auto  text-gray-700">{val.name}</h6>
            </div>
            <div className="w-1/3 hidden sm:flex">
              <div className="m-auto text-gray-500">
                Rp{val.price.toLocaleString("id-ID")}
              </div>
            </div>
            <div className="w-1/3 hidden sm:flex">
              <div className="w-1/2 flex items-center justify-center text-green-700 cursor-pointer">
                <div onClick={() => editProductOnClick(val._id)}>
                  <FaEdit />
                </div>
              </div>
              <div className="w-1/2 flex items-center justify-center text-red-700 cursor-pointer">
                <div onClick={() => deleteProductOnClick(val._id)}>
                  <FaTrash />
                </div>
              </div>
            </div>
          </div>

          <div className="block sm:hidden w-full border border-gray-200 rounded-md bg-white mb-3">
            <div className="w-full flex flex-col">
              <div className="w-full border-b border-gray-200 py-1">
                <img
                  src={`${Site.ori}/${val.image}`}
                  className="m-auto h-24"
                  // style={{ height: "100px" }}
                  alt={val.name}
                />
              </div>
              <div className="w-full flex border-b border-gray-200">
                <div className="w-1/3 bg-purple-800 text-white py-1 px-2 flex items-center font-semibold text-sm">
                  Name
                </div>
                <div className="w-2/3 py-1 px-2 text-gray-700">{val.name}</div>
              </div>
              <div className="w-full flex border-b border-gray-200">
                <div className="w-1/3 bg-purple-800 text-white py-1 px-2 font-semibold text-sm">
                  Price
                </div>
                <div className="w-2/3 py-1 px-2 text-gray-700">
                  Rp{val.price.toLocaleString("id-ID")}
                </div>
              </div>
              <div className="w-full flex ">
                <div className="w-1/3 bg-purple-800 text-white py-1 px-2 rounded-bl-md font-semibold text-sm">
                  Edit/Delete
                </div>
                <div className="w-2/3 flex py-1 px-2">
                  <div
                    className="mx-auto text-green-700"
                    onClick={() => editProductOnClick(val._id)}
                  >
                    <FaEdit />
                  </div>
                  <div
                    className="mx-auto text-red-700"
                    onClick={() => deleteProductOnClick(val._id)}
                  >
                    <FaTrash />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <React.Fragment>
      <div className="w-full sm:w-4/5 p-3 mx-0 sm:mx-auto">
        <div className="px-3 sm:px-0">
          <div className="w-full font-bold text-lg sm:text-xl md:text-2xl">
            Product List
          </div>
          <hr />

          <div className="mt-3 w-full hidden rounded-md shadow-md border border-gray-200 bg-white sm:flex flex-col">
            <div className="rounded-t-md border-b border-gray-200 bg-purple-800 text-white text-center flex">
              <div className="font-bold w-1/3 m-auto text-lg tracking-wider p-2">
                Name
              </div>
              <div className="font-bold w-1/3 m-auto text-lg tracking-wider p-2">
                Price
              </div>
              <div className="font-bold w-1/3 m-auto text-lg tracking-wider p-2">
                Edit/Delete
              </div>
            </div>
            <div className="w-full">{productList}</div>
          </div>

          <div
            className="block sm:hidden mt-3 overflow-y-auto"
            style={{ height: "400px" }}
          >
            {productList}
          </div>
        </div>
      </div>
      {/* </div> */}
      {editMenu}
      {deleteMenu}
    </React.Fragment>
  );
}

export default EditDelete;