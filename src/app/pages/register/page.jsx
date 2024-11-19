"use client";

import { useState, React } from "react";
import { useRouter } from "next/navigation";
import InputLabel from "../../components/Global/InputLabel";
import ButtonPrimary from "../../components/Global/ButtonPrimary";
import SectionLink from "../../components/Login/SectionRegister";
import validates from "@/app/utils/globalValidation";
import { findByEmail, registerUser } from "../../services/Users";
import FormGlobal from "../../components/Global/FormGlobal";

function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validação
    const validation = validates("", email, password);
    if (validation) {
      alert(validation);
      return;
    }

    if (password != passwordConfirmation) {
      alert("Senha diferente da confirmação");
      return;
    }

    const data = {
      name: name,
      email: email,
      password: password,
      expenses: [],
      earnings: [],
      limits: {
        education: 500,
        leisure: 500,
        health: 500,
        food: 500,
        transportation: 300,
      },
    };

    const emailExists = await findByEmail(email);
    if (emailExists) {
      alert("Email já cadastrado");
      return;
    }

    registerUser(data);
    alert("Cadastro realizado com sucesso!");
    router.push("/");
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <>
      <FormGlobal
        Header={"Register"}
        Handle={handleRegister}
        Footer={
          <SectionLink
            label="Already have an account?"
            text="Login"
            onClick={handleBack}
          />
        }
      >
        <InputLabel
          label="Name"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputLabel
          label="E-mail"
          type="email"
          placeholder="Enter E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputLabel
          label="Password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputLabel
          label="Password Confirmation"
          type="password"
          placeholder="Enter Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <ButtonPrimary text="Registrar" />
      </FormGlobal>
    </>
  );
}

export default LoginPage;
