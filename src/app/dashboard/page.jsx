"use client"

import Menu from "@/app/components/Dashboard/Menu";
import { React, useEffect } from "react";
import { useRouter } from "next/navigation";


function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Consultar autenticação do usuário
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push('/')
    }
  }, [router]);

  return (
    <>
      <Menu />
    </>
  );
}

export default Dashboard;
