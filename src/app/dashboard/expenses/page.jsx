"use client"

import { React, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authSession } from "../../services/Users";
import ButtonAdd from "@/app/components/Expenses/ButtonAdd";
import FormGlobal from "@/app/components/Global/FormGlobal";
import InputLabel from "@/app/components/Global/InputLabel";


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

  const handleForm = () => {
    console.log('click')
  }

  useEffect(() => {
    auth()

  }, [auth]);

  return (
    <>
      <ButtonAdd handle={handleForm}/>
      <FormGlobal Header={"Adicionar Despesa"}>
        <InputLabel/>
      </FormGlobal>
    </>
  );
}

export default Expenses;
