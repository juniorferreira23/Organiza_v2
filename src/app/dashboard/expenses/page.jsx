"use client"

import { React, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authSession } from "../../services/Users";


function Expenses() {
  const router = useRouter();

  const auth = async () => {
    // Consultar autenticação do usuário
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push('/');
      return
    }

    const auth = await authSession(user);
    if (!auth) {
      router.push('/');
    }
  }

  useEffect(() => {
    auth()

  }, [auth]);

  return (
    <>
    </>
  );
}

export default Expenses;
