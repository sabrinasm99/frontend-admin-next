import React from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../components/store";
import ComponentAdd from "../components/Add";

function add() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Head>
          <title>Purple Mart</title>
        </Head>
        <ComponentAdd />
      </Provider>
    </React.Fragment>
  );
}

export default add;
