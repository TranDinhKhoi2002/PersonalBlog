import React from "react";

import Link from "next/link";
import Logo from "./logo";

import classes from "./main-navigation.module.css";

const MainNavigation = React.memo(function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/account">Account</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default MainNavigation;
