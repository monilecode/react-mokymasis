import React, { useContext } from "react";
import { Topbar } from "./Topbar";
import { Outlet } from "react-router-dom";

export const BaseLayout = () => {
  return (
    <>
      <Topbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
