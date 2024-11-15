"use client";

import { useState, React } from "react";
import { useRouter } from "next/navigation";
import { Form, Container, Row, Col } from "react-bootstrap";
import ButtonPrimary from "./components/Global/ButtonPrimary";
import InputLabel from "./components/Global/InputLabel";
import SectionLink from "./components/Login/SectionRegister";
import validates from "@/app/utils/globalValidation";
import { authLogin } from "./services/Users";
import FormGlobal from "./components/Global/FormGlobal";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Validação
      const validation = validates("", email, password);
      if (validation) {
        alert(validation);
        return;
      }

      const data = {
        email: email,
        password: password,
      };

      // service Api
      const user = await authLogin(data);

      if (user) {
        // Armazena o usuário no localStorage para simular uma sessão
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/dashboard");
      } else {
        alert("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao tentar fazer login");
    }
  };

  const handlerRegister = () => {
    router.push("/register");
  };

  return (
    <>
      <FormGlobal
        Header={"Login"}
        Handle={handleLogin}
        Footer={
          <SectionLink
            label="Não tem uma conta?"
            text="Registrar"
            onClick={handlerRegister}
          />
        }
      >
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
        <ButtonPrimary text="Login" />
      </FormGlobal>
    </>
  );
}

export default LoginPage;
