"use client"

import Menu from "@/app/components/Dashboard/Menu";
import { React, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authSession } from "../services/Users";


function Dashboard() {
  const router = useRouter();

  const auth = async () => {
    // Consultar autenticação do usuário
    const user = JSON.parse(localStorage.getItem("user"));
    const auth = await authSession(user);
    if (!user || !auth) {
      router.push('/');
    }
  }

  useEffect(() => {
    auth()

  }, [auth]);

  return (
    <>
      <Menu />
    </>
  );
}

export default Dashboard;
