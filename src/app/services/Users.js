const { default: axios } = require("axios");

const urlUsers = "http://localhost:3001/users";

const validateData = (data) => {
  if (typeof data === String) {
    if (data === "" || data.lengt === 0) {
      return false;
    }
  } else if (data === undefined || data === null) {
    return false;
  } else if (typeof Object) {
    if (Object.keys(data).length === 0) {
      return false;
    }
  }

  return true;
};

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export const getUser = async (id) => {
  try {
    // Consultando se existe o e-mail e senha na api users
    const response = await axios.get(urlUsers, {
      params: {
        id: id
      }
    });

    // Selecionando os dados
    const user = response.data[0];

    return user;
  } catch (error) {
    console.error("Erro ao consultar o usuário:", error);
  }
};

export const authLogin = async (data) => {
  try {
    // Consultando se existe o e-mail e senha na api users
    const response = await axios.get(urlUsers, {
      params: {
        email: data.email,
        password: data.password,
      },
    });

    // Selecionando os dados
    const user = response.data[0];

    return user;
  } catch (error) {
    console.error("Erro ao consultar o usuário:", error);
  }
};

export const findByEmail = async (data) => {
  try {
    const response = await axios.get(urlUsers, {
      params: {
        email: data,
      },
    });

    const user = response.data[0];

    if (user) {
      //console.log(`Usuário encontrado ${user}`)
      return user;
    }

    return;
  } catch (error) {
    console.error("Erro ao buscar o email:", error);
  }
};

export const registerUser = async (data) => {
  try {
    const response = await axios.post(urlUsers, data);
    //console.log("Dados salvos com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao salvar os dados:", error);
  }
};

export const authSession = async (data) => {
  try {
    const validate = validateData(data);
    if (!validate) {
      return;
    }

    const response = await axios.get(urlUsers, data);

    const user = response.data[0];

    if (user) {
      //console.log(`Sessão encontrado ${user}`)
      return user;
    }

    return;
  } catch (error) {
    console.error("Erro ao autenticar sessão:", error);
  }
};

export const getCategories = async (params) => {
  try {
    const validate = validateData(params);
    if (!validate) {
      return;
    }

    const response = await axios.get(urlUsers, params);

    const data = response.data[0];

    if (data) {
      const categories = [];
      Object.keys(data.limits).map((key) => {
        categories.push(key);
      });
      return categories;
    }

    return;
  } catch (error) {
    console.error("Erro ao buscar o categorias:", error);
  }
};

export const saveExpense = async (id, expense) => {
  try {
    const response = await axios.get(urlUsers, {
      params: {
        id: id,
      },
    });
    const data = response.data[0];

    // Convertendo o valor do input strin para number
    expense.price = parseFloat(expense.price);

    // Gerando Id
    expense.id = generateUniqueId();

    data.expenses.push(expense);

    const url = `${urlUsers}/${id}`;
    await axios.put(url, data);
  } catch (error) {
    console.error("Erro ao salvar a despesa:", error);
  }
};

export const getExpenses = async (id) => {
  try {
    const response = await axios.get(urlUsers, {
      params: {
        id: id,
      },
    });
    const data = response.data[0];

    return data.expenses;
  } catch (error) {
    console.error("Erro ao salvar a despesa:", error);
  }
};

export const findByIdExpense = async (id, idExpense) => {
  try {
    const validate = validateData(id);
    if (!validate) {
      return;
    }

    const user = await getUser(id);
    if (!user || !user.expenses) return;

    // Use `.find()` para retornar o item correspondente
    const expense = user.expenses.find((expense) => expense.id === idExpense);

    if (!expense) {
      console.error("Despesa não encontrada");
      return;
    }

    return expense;
  } catch (error) {
    console.error("Erro ao buscar a despesa por id:", error);
  }
};

export const updateExpense = async (id, newExpense) => {
  try {
    const validate = validateData(id);
    if (!validate) {
      return;
    }

    const user = await getUser(id);

    user.expenses.forEach((expense) => {
      if (expense.id === newExpense.id) {
        console.log(expense)
        expense.category = newExpense.category;
        expense.date = newExpense.date;
        expense.price = parseFloat(newExpense.price);
        expense.details = newExpense.details;
      }
    });

    const url = `${urlUsers}/${id}`;
    await axios.put(url, user);
  } catch (error) {
    console.error("Erro ao atualizar despesa:", error);
  }
};

export const deleteExpense = async (id, idExpense) => {
  try {
    const validate = validateData(id);
    if (!validate) {
      return;
    }

    const user = await getUser(id);

    user.expenses = user.expenses.filter((expense) => expense.id !== idExpense);

    const url = `${urlUsers}/${id}`;
    await axios.put(url, user);
  } catch (error) {
    console.error("Erro ao atualizar despesa:", error);
  }
};
