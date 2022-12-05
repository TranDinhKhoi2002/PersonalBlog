import Head from "next/head";
import { Fragment } from "react";
import AccountInfor from "../components/account/account-infor";

function AccountPage(props) {
  const { name, address, phone, email, username, password } = props;
  return (
    <Fragment>
      <Head>
        <title>Account</title>
        <meta name="description" content="Manage your account" />
      </Head>
      <AccountInfor name={name} address={address} phone={phone} email={email} username={username} password={password} />
    </Fragment>
  );
}

export default AccountPage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  console.log(req, res);

  return {
    props: {
      username: "trandinhkhoi102",
      password: "111111",
      name: "Khoi Tran",
      address: "Ben Tre, Viet Nam",
      phone: "0349175827",
      email: "trandinhkhoi102@gmail.com",
    },
  };
}
