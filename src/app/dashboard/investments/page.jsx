"use client";

import ButtonAdd from "@/app/components/Expenses/ButtonAdd";
import ButtonPrimary from "@/app/components/Global/ButtonPrimary";
import FormFloanting from "@/app/components/Global/FormFloating";
import InputLabel from "@/app/components/Global/InputLabel";
import Cards from "@/app/components/Investments/Cards";
import {
  authSession,
  deleteInvestment,
  getInvestment,
  saveInvestment,
} from "@/app/services/Users";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Budget() {
  const [isToggled, setIsToggled] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [institutionInput, setInstitutionInput] = useState("");
  const [feesInput, setFeesInput] = useState("");
  const [investments, setInvestments] = useState([]);

  const router = useRouter();

  const clearInputs = () => {
    setDateInput("")
    setPriceInput("")
    setInstitutionInput("")
    setFeesInput("")
  }

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

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  const handleForm = async (e) => {
    e.preventDefault()
    const id = getUserId();
    const data = {
        date: parseInt(dateInput),
        price: parseInt(priceInput),
        institution: parseInt(institutionInput),
        fees: parseInt(feesInput)
    }
    await saveInvestment(id, data)
    setInvestments([...investments, data])
    handleToggle()
    clearInputs()
  };

  const HandlerInvestments = async () => {
    const id = getUserId()
    const response = await getInvestment(id)
    setInvestments(response)
  }

  const HandlerDelete = async (idInvestment) => {
    const id = getUserId()
    await deleteInvestment(id, idInvestment)
    setInvestments((prevInvestments) =>
      prevInvestments.filter((investment) => investment.id !== idInvestment)
    );
  }

  useEffect(() => {
    auth();
    HandlerInvestments()
  }, []);

  return (
    <>
      <ButtonAdd handle={handleToggle} />
      <Cards data={investments} handleDelete={HandlerDelete}/>
      {isToggled && (
        <FormFloanting
          Header={"Add Investments"}
          Handle={handleForm}
          Height="80vh"
          HandleClose={handleToggle}
        >
          <InputLabel
            label="Date"
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <InputLabel
            label="Valor"
            type="number"
            placeholder="R$"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
          />
          <InputLabel
            label="Institution"
            type="text"
            value={institutionInput}
            onChange={(e) => setInstitutionInput(e.target.value)}
          />
          <InputLabel
            label="Fees per year"
            type="number"
            placeholder="%"
            value={feesInput}
            onChange={(e) => setFeesInput(e.target.value)}
          />
          <ButtonPrimary text="Submit" />
        </FormFloanting>
      )}
    </>
  );
}

export default Budget;
