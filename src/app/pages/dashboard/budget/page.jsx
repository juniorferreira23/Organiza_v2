"use client";

import CardsGrid from "@/app/components/Budget/CardsGrid";
import ButtonAction from "@/app/components/Global/ButtonAction";
import ButtonPrimary from "@/app/components/Global/ButtonPrimary";
import FormFloanting from "@/app/components/Global/FormFloating";
import InputLabel from "@/app/components/Global/InputLabel";
import {
  authSession,
  getCategoriesWithLimitsTotals,
  getLimits,
  updateLimits,
} from "@/app/services/Users";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Budget() {
  const [categoryWithLimitsTotals, setCategoryWithLimitsTotals] = useState([]);
  const [isToggled, setIsToggled] = useState(false);
  const [limits, setLimits] = useState({});
  const [initialLimits, setInitialLimits] = useState({}); // Armazena os valores iniciais da API

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

  const handleCards = async () => {
    const id = getUserId();
    const data = await getCategoriesWithLimitsTotals(id);
    setCategoryWithLimitsTotals(data);
  };

  const handleLimits = async () => {
    const id = getUserId();
    const response = await getLimits(id);
    setLimits(response);
    setInitialLimits(response); // Salva os limites originais
  };

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
    if (!isToggled) {
      setLimits(initialLimits); // Reseta os limites ao abrir o formulário
    }
  };

  const handleLimitChange = (key, value) => {
    setLimits((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleForm = async () => {
    const id = getUserId();
    await updateLimits(id, limits);
    setInitialLimits(limits); // Atualiza os limites iniciais após o envio
    setIsToggled(false); // Fecha o formulário
  };

  useEffect(() => {
    auth();
    handleCards();
    handleLimits(); // Chama uma única vez para carregar os valores iniciais
  }, []);

  return (
    <>
      <div className="container text-right py-3">
        <ButtonAction
          Variant="primary"
          Text="Settings"
          Handle={handleToggle}
        />
      </div>
      <CardsGrid data={categoryWithLimitsTotals} />
      {isToggled && (
        <FormFloanting
          Header={"Edit Limits"}
          Handle={handleForm}
          Height="80vh"
          HandleClose={handleToggle}
        >
          {Object.keys(limits).map((key) => (
            <InputLabel
              key={key}
              label={key}
              type="number"
              value={limits[key] || ""}
              onChange={(e) => handleLimitChange(key, e.target.value)}
            />
          ))}
          <ButtonPrimary text="Submit" />
        </FormFloanting>
      )}
    </>
  );
}

export default Budget;
