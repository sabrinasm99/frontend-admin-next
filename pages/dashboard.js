import React from "react";
import Head from 'next/head';
import { Provider } from "react-redux";
import store from "../components/store";
import CompDashboard from "../components/CompDashboard";

function dashboard() {
  return (
    <React.Fragment>
      <Provider store={store}>
      <Head>
          <title>Purple Mart</title>
        </Head>
        <CompDashboard />
      </Provider>
    </React.Fragment>
  );
}

export default dashboard;
