"use client";

import { React, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  authSession,
  getCategories,
  getExpenses,
  saveExpense,
} from "../../services/Users";
import ButtonAdd from "@/app/components/Expenses/ButtonAdd";
import InputLabel from "@/app/components/Global/InputLabel";
import ButtonPrimary from "@/app/components/Global/ButtonPrimary";
import SelectInput from "@/app/components/Global/SelectInput";
import { capitalizeFirstLetter } from "@/app/utils/globalValidation";
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
  const router = useRouter();

  const clearInputs = () => {
    setCategoryInput("");
    setDateInput("");
    setPriceInput("");
    setDescriptionInput("");
  };

  const auth = async () => {
    // Consultar autenticação do usuário
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/");
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

    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;
    const expense = {
      category: categoryInput,
      date: dateInput,
      price: priceInput,
      details: descriptionInput,
    };
    await saveExpense(id, expense);
    setIsToggled(false);
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
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user?.id;
    if (id) {
      const expenses = await getExpenses(id);
      setExpenses(expenses);
    }
  };

  const handleEdit = (id) => {
    console.log(id);
    if (!isToggled) {
      handleToggle();
    }
  };

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
          Header={"Add Expenses"}
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
      <TableExpense data={expenses} HandleEdit={handleEdit} />
    </>
  );
}

export default Expenses;
