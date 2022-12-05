import { useEffect, useState } from "react";
import Notification from "../ui/notification";
import classes from "./account-infor.module.css";

async function updateAccount(contactDetails) {
  const response = await fetch("/api/account", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

function AccountInfor(props) {
  const { name, address, phone, email, username, password } = props;

  const [enteredName, setEnteredName] = useState(name);
  const [enteredAddress, setEnteredAddress] = useState(address);
  const [enteredPhone, setEnteredPhone] = useState(phone);
  const [enteredEmail, setEnteredEmail] = useState(email);
  const [enteredUserName, setEnteredUserName] = useState(username);
  const [enteredPassword, setEnteredPassword] = useState(password);
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [requestStatus]);

  const handleUpdateAccount = async (e) => {
    e.preventDefault();

    setRequestStatus("pending");
    try {
      await updateAccount({
        email: enteredEmail,
        name: enteredName,
        phone: enteredPhone,
        address: enteredAddress,
        username: enteredUserName,
        password: enteredPassword,
      });
      setRequestStatus("success");
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  };

  let notification;

  switch (requestStatus) {
    case "pending":
      notification = {
        status: "pending",
        title: "Sending data...",
        message: "Your data is on its way!",
      };
      break;
    case "success":
      notification = {
        status: "success",
        title: "Success",
        message: "Your account information saved successfully!!!!!!",
      };
      break;
    case "error":
      notification = {
        status: "error",
        title: "Error",
        message: requestError,
      };
      break;
  }

  return (
    <section className={classes.contact}>
      <h1>Your Account</h1>
      <form onSubmit={handleUpdateAccount} className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              disabled
              required
              value={enteredUserName}
              onChange={(event) => setEnteredUserName(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              value={enteredPassword}
              onChange={(event) => setEnteredPassword(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              required
              value={enteredAddress}
              onChange={(event) => setEnteredAddress(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              id="phone"
              required
              value={enteredPhone}
              onChange={(event) => setEnteredPhone(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.actions}>
          <button>Save</button>
        </div>
      </form>

      {notification && (
        <Notification status={notification.status} title={notification.title} message={notification.message} />
      )}
    </section>
  );
}

export default AccountInfor;
