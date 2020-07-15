import Head from 'next/head';
import Login from '../components/Login';

export default function Home() {
  return (
    <React.Fragment>
      <Head><title>Admin Purple Mart</title></Head>
      <Login />
    </React.Fragment>
  )
}
