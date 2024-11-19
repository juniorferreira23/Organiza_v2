"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  authSession,
  getLimits,
  getSumCategories,
  getTotalExpenses,
  getTotalInvestments,
} from "../../services/Users";
import { Container, Row, Col } from "react-bootstrap";
import UserChart from "../../components/Dashboard/UserChart";
import CardDashboard from "../../components/Dashboard/CardDashboard";

function Dashboard() {
  const [limits, setLimits] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState();
  const [totalRevenue, setTotalRevenue] = useState();

  const router = useRouter();

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id;
  };

  const auth = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || Object.keys(user).length === 0) {
      router.push("/");
      return;
    }

    const isAuth = await authSession(user);
    if (!isAuth) {
      router.push("/");
    }
  };

  const handleExpeses = async () => {
    const id = getUserId();
    const response = await getSumCategories(id);
    // Transformar objeto em array de { name, value }
    const result = Object.entries(response).map(([key, value]) => ({
      name: key,
      value: value,
    }));
    setExpenses(result);
  };

  const handlerLimits = async () => {
    const id = getUserId();
    const response = await getLimits(id);

    // Transformar objeto em array de { name, value }
    const result = Object.entries(response).map(([key, value]) => ({
      name: key,
      value: value,
    }));
    setLimits(result);
  };

  const handleTotals = async () => {
    const id = getUserId();
    const response = await getTotalExpenses(id);
    const data = await getTotalInvestments(id);
    setTotalExpenses(response.toFixed(2));
    setTotalRevenue(data.toFixed(2))
  };

  useEffect(() => {
    auth();
    handlerLimits();
    handleExpeses();
    handleTotals();
  }, []);

  return (
    <Container className="py-4">
      <Row>
        <CardDashboard Title="Total expenses" Value={totalExpenses} />
        <CardDashboard Title="Total revenue" Value={totalRevenue} />
      </Row>
      <Row>
        <Col>
          <UserChart title="Expenses by Category" data={expenses} />
        </Col>
        <Col>
          <UserChart title="Limits by Category" data={limits} />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
