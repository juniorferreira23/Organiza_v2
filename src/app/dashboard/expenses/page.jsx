"use client";

import { React, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authSession, getCategories } from "../../services/Users";
import ButtonAdd from "@/app/components/Expenses/ButtonAdd";
import InputLabel from "@/app/components/Global/InputLabel";
import ButtonPrimary from "@/app/components/Global/ButtonPrimary";
import SelectInput from "@/app/components/Global/SelectInput";
import { capitalizeFirstLetter } from "@/app/utils/globalValidation";
import FormFloanting from "@/app/components/Global/FormFloating";

function Expenses() {
  const [categoryInput, setCategoryInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [optionsSelect, setOptionsSelect] = useState([])
  const [isToggled, setIsToggled] = useState(false)
  const router = useRouter();

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

  const handleButtomAdd = () => {
    setIsToggled((prevState) => !prevState)
  }

  const handleForm = (e) => {
    e.preventDefault();
    console.log("click");
  };

  const handleOptions = async () => {
    const session = JSON.parse(localStorage.getItem('user'))
    const response = await getCategories(session)
    const options = []
    response?.map((option) => {
      options.push({value: option, label: capitalizeFirstLetter(option)})
    })
    setOptionsSelect(options); 
  }

  useEffect(() => {
    auth();
    if(optionsSelect.length === 0) {
      handleOptions() // Se começar a dar loop infinito colocar uma condição no qual se o estado options estiver preenchido não executa
    }
  }, [auth]);

  return (
    <>
      <ButtonAdd handle={handleButtomAdd} />
      {isToggled ? <FormFloanting Header={"Add Expenses"} Handle={handleForm} Height="80vh">
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
      </FormFloanting> : ""}
    </>
  );
}

export default Expenses;
