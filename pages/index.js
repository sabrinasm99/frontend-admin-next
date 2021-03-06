import Head from "next/head";
import Login from "../components/Login";
import { Provider } from "react-redux";
import store from "../components/store";

export default function Home() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Head>
          <title>Admin Purple Mart</title>
        </Head>
        <Login />
      </Provider>
    </React.Fragment>
  );
}
