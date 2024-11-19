"use client"

import Menu from "@/app/components/Dashboard/Menu";

export default function Layout({ children }) {
  return (
    <>
      <Menu></Menu>
      {children}
    </>
    
  );
}
