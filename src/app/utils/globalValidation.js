const verifyName = (name) => {
  try {
    if (name.length < 4) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("Erro ao tentar verificar nome");
  }
};

const isEmail = (email) => {
  try {
    // Expressão regular para validar o e-mail
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Testa o e-mail com a expressão regular
    return regex.test(email);
  } catch (error) {
    console.log("Erro ao tentar verificar E-mail");
  }
};

const verifyPassword = (password) => {
  try {
    if (password.length < 4) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("Erro ao verificar password");
  }
};

const validates = (name = "", email = "", password = "") => {
  if (name) {
    const validateName = verifyName(name);
    if (!validateName) {
      return "Nome deve conter no mínimo 4 caracteres";
    }
  }

  if (email) {
    const validateEmail = isEmail(email);
    if (!validateEmail) {
      return "Email incorreto";
    }
  }

  if (password) {
    const validatePassword = verifyPassword(password);
    if (!validatePassword) {
      return "Senha deve conter no mínimo 4 dígitos";
    }
  }
};

export default validates;

export const capitalizeFirstLetter = (str) => {
  if (!str) return ""; // Verifica se a string não está vazia
  return str.charAt(0).toUpperCase() + str.slice(1);
};

