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
    const validate = validateData(id);
    if (!validate) {
      return;
    }

    // Consultando se existe o e-mail e senha na api users
    const response = await axios.get(urlUsers, {
      params: {
        id: id,
      },
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
    const validate = validateData(data);
    if (!validate) {
      return;
    }

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

export const findByEmail = async (email) => {
  try {
    const validate = validateData(email);
    if (!validate) {
      return;
    }

    const response = await axios.get(urlUsers, {
      params: {
        email: email,
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
    const validate = validateData(data);
    if (!validate) {
      return;
    }

    await axios.post(urlUsers, data);
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
    const validate = validateData(id);
    if (!validate) {
      return;
    }

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
    const validate = validateData(id);
    if (!validate) {
      return;
    }

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

export const getSumCategories = async (id) => {
  try {
    const validate = validateData(id);
    if (!validate) {
      return;
    }

    const response = await axios.get(urlUsers, {
      params: {
        id: id,
      },
    });

    const user = response.data[0];

    const categoryTotals = user.expenses.reduce((totals, expense) => {
      const category = expense.category;
      const price = parseFloat(expense.price) || 0;
      if (!totals[category]) {
        totals[category] = 0;
      }
      totals[category] += price;
      return totals;
    }, {});

    return categoryTotals;
  } catch (error) {
    console.error("Erro ao buscar ou processar dados:", error);
  }
};

export const getLimits = async (id) => {
  try {
    const validate = validateData(id);
    if (!validate) {
      return;
    }

    const response = await axios.get(urlUsers, {
      params: {
        id: id,
      },
    });

    const user = response.data[0];
    if (!user) {
      console.error("Usuário não encontrado");
      return null;
    }

    const limits = user.limits;

    return limits;
  } catch (error) {
    console.error("Erro ao buscar limites", error);
  }
};

export const getCategoriesWithLimitsTotals = async (id) => {
  try {
    const validate = validateData(id);
    if (!validate) {
      return;
    }

    const categoriesTotals = await getSumCategories(id);
    const limits = await getLimits(id);

    if (limits) {
      const totalsWithLimits = [];

      Object.keys(limits).forEach((key) => {
        const obj = {
          category: key,
          expense: categoriesTotals[key] || 0,
          limit: limits[key]
        }
        totalsWithLimits.push(obj)
      });

      return totalsWithLimits;
    }
  } catch (error) {}
};

export const updateLimits = async (id, newLimits) => {
  try {
    const validate = validateData(id);
    if (!validate) {
      return;
    }

    const user = await getUser(id);

    user.limits = newLimits;

    const url = `${urlUsers}/${id}`;
    await axios.put(url, user);
  } catch (error) {
    console.error("Erro ao atualizar os limites:", error);
  }
};
