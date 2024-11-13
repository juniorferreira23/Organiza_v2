"use client"

import { useState, React } from "react";
//import axios from "axios";
//import { useRouter } from 'next/navigation';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import ButtonPrimary from './components/Login/ButtonPrimary';
import InputLabel from './components/Login/InputLabel';
import SectionRegister from './components/Login/SectionRegister';
import authLogin from "@/services/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault();

    authLogin()
    //tarefas autenticar login no services, mas efetuar a navegação no login
    //criar token para cada usuário para usar de autenticação

    // try {
    //   const response = await axios.get(`http://localhost:3000/users`, {
    //     params: {
    //       email: email,
    //       password: password
    //     }
    //   });

    //   console.log(response)

    //   const user = response.data[0];

    //   console.log(user)

    //   if (user) {
    //     // Armazena o usuário no localStorage para simular uma sessão
    //     localStorage.setItem("user", JSON.stringify(user));
    //     router.push("pages/dashboard");
    //   } else {
    //     alert("Credenciais inválidas");
    //   }
    // } catch (error) {
    //   console.error("Erro ao fazer login:", error);
    //   alert("Erro ao tentar fazer login");
    // }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100" style={{ maxWidth: '400px' }}>
        <Col>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleLogin}>
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
          <ButtonPrimary text="Login"/>
          </Form>
          <SectionRegister/>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
