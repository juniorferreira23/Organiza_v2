"use client"

import Menu from "../components/Dashboard/Menu";

export default function Layout({ children }) {
  return (
    <>
      <Menu></Menu>
      {children}
    </>
    
  );
}
