"use client";

import { React, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  authSession,
  deleteExpense,
  findByIdExpense,
  getCategories,
  getExpenses,
  saveExpense,
  updateExpense,
} from "@/app/services/Users";
import ButtonAdd from "@/app/components/Expenses/ButtonAdd";
import InputLabel from "@/app/components/Global/InputLabel";
import ButtonPrimary from "@/app/components/Global/ButtonPrimary";
import SelectInput from "@/app/components/Global/SelectInput";
import { capitalizeFirstLetter } from "@/app/utils/formatString";
import FormFloanting from "@/app/components/Global/FormFloating";
import TableExpense from "@/app/components/Expenses/TableExpense";

function Expenses() {
  const [categoryInput, setCategoryInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [optionsSelect, setOptionsSelect] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState(null);

  const router = useRouter();

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user?.id;
    return id
  }

  const clearInputs = () => {
    setCategoryInput("");
    setDateInput("");
    setPriceInput("");
    setDescriptionInput("");
  };

  const auth = async () => {
    // Consultar autenticação do usuário
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || Object.keys(user).length === 0) {
      router.push('/');
      return;
    }

    const auth = await authSession(user);
    if (!auth) {
      router.push("/");
    }
  };

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const id = getUserId();
    const expense = {
      id: editExpenseId,
      category: categoryInput,
      date: dateInput,
      price: priceInput,
      details: descriptionInput,
    };

    if (isEditing && editExpenseId) {
      // Lógica para atualizar o item existente
      await updateExpense(id, expense);
    } else {
      // Lógica para criar um novo item
      await saveExpense(id, expense);
    }

    setIsToggled(false);
    setIsEditing(false);
    setEditExpenseId(null);
    clearInputs();
  };

  const handleOptions = async () => {
    const session = JSON.parse(localStorage.getItem("user"));
    const response = await getCategories(session);
    const options = [];
    response?.map((option) => {
      options.push({ value: option, label: capitalizeFirstLetter(option) });
    });
    setOptionsSelect(options);
  };

  const handleExpenses = async () => {
    const id = getUserId();
    if (id) {
      const expenses = await getExpenses(id);
      setExpenses(expenses);
    }
  };

  const handleEdit = async (idExpense) => {
    setEditExpenseId(idExpense);
    const id = getUserId();
    const expense = await findByIdExpense(id, idExpense);

    setCategoryInput(expense.category);
    setDateInput(expense.date);
    setPriceInput(expense.price);
    setDescriptionInput(expense.details);
    setEditExpenseId(expense.id);
    setIsEditing(true);

    if (!isToggled) {
      handleToggle();
    }
  };

  const handleDelete = async (idExpense) => {
    const id = getUserId()
    deleteExpense(id, idExpense)
  }

  useEffect(() => {
    auth();
    if (optionsSelect.length === 0) {
      handleOptions(); // Se começar a dar loop infinito colocar uma condição no qual se o estado options estiver preenchido não executa
    }
    handleExpenses();
  }, [auth]);

  return (
    <>
      <ButtonAdd handle={handleToggle} />
      {isToggled ? (
        <FormFloanting
          Header={isEditing ? "Edit Expense" : "Add Expense"}
          Handle={handleForm}
          Height="80vh"
          HandleClose={handleToggle}
        >
          <SelectInput
            Options={optionsSelect}
            value={categoryInput}
            onChange={setCategoryInput}
          />
          <InputLabel
            label="Date"
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <InputLabel
            label="Price"
            type="number"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
          />
          <InputLabel
            label="Description"
            type="text"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          <ButtonPrimary text="Submit" />
        </FormFloanting>
      ) : (
        ""
      )}
      <TableExpense data={expenses} HandleEdit={handleEdit} HandleDelete={handleDelete} />
    </>
  );
}

export default Expenses;
