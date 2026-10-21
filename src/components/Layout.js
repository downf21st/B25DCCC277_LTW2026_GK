import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = ({ buildTag }) => (
  <div data-build={buildTag}>
    <NavBar />
    <Outlet />
  </div>
);

export default Layout;
