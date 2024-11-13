"use client"

import { useState, React } from "react";
import { useRouter } from 'next/navigation';
import { Form, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import InputLabel from "../components/Login/InputLabel";
import ButtonPrimary from "../components/Login/ButtonPrimary";
import SectionLink from "../components/Login/SectionRegister";
import validates from "@/utils/globalValidation";
//import { findByEmail } from "@Users";


function LoginPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const router = useRouter();

    const saveData = async (url, data) => {
        try {
            const response = await axios.post(url, data);
            console.log("Dados salvos com sucesso:", response.data);
        } catch (error) {
            console.error("Erro ao salvar os dados:", error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validação
        const validation = validates('', email, password)
        if (validation) {
            alert(validation)
            return
        }

        if (password != passwordConfirmation) {
            alert('Senha diferente da confirmação')
            return
        }

        const url = 'http://localhost:3001/users'

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
                transportation: 300
            }
        }

        // const emailExists = findByEmail(url)
        // if (emailExists) {
        //     alert('Email já cadastrado')
        //     return
        // }

        saveData(url, data);
        //router.push('/')
    };

    const handleBack = () => {
        router.push('/')
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100" style={{ maxWidth: '400px' }}>
                <Col>
                    <h2 className="text-center mb-4">Registrar</h2>
                    <Form onSubmit={handleRegister}>
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
                    </Form>
                    <SectionLink label="Já tem cadastro?" text="Logar" onClick={handleBack} />
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;