"use client"

import { useState, React } from "react";
import { useRouter } from 'next/navigation';
import { Form, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import ButtonPrimary from './components/Login/ButtonPrimary';
import InputLabel from './components/Login/InputLabel';
import SectionLink from './components/Login/SectionRegister';
import validates from "@/utils/globalValidation";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Validação
      const validation = validates('', email, password)
      if(validation){
        alert(validation)
        return
      }

      // Consultando se existe o e-mail e senha na api users
      const response = await axios.get(`http://localhost:3001/users`, {
        params: {
          email: email,
          password: password
        }
      });

      // Selecionando os dados
      const user = response.data[0];


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
    console.log('click register')
    router.push('/register')
  }

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
            <ButtonPrimary text="Login" />
          </Form>
          <SectionLink label="Não tem uma conta?" text="Registrar" onClick={handlerRegister} />
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
