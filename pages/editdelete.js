import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../components/store";
import ComponentEditDelete from "../components/EditDelete";

function editdelete() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Head>
          <title>Purple Mart</title>
        </Head>
        <ComponentEditDelete />
      </Provider>
    </React.Fragment>
  );
}

export default editdelete;
