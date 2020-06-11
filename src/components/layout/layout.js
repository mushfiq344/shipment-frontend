import React from "react";
import Header from "../header/header";
import Sidebar from "../sidbaer/sidebar";

export default function Layout({ children }) {
  return (
    <div>
      <div className="page-wrapper">
        <div className="page-body-wrapper">
          <Header />
          <Sidebar />

          <div className="page-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
