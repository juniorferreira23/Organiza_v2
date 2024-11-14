const { default: axios } = require("axios");

const urlUsers = 'http://localhost:3001/users'

const validateData = (data) => {
    console.log(data)
    if (typeof data === String) {
        if (data === '' || data.lengt === 0) {
            return false
        }
    } else if (typeof Object) {
        console.log('entrou no if objeto')
        if (Object.keys(data).length === 0) {
            console.log('entrou no if tamanho do objeto')
            return false
        }
    }

    return true
}

export const authLogin = async (data) => {
    try {
        // Consultando se existe o e-mail e senha na api users
        const response = await axios.get(urlUsers, {
            params: {
                email: data.email,
                password: data.password
            }
        });

        // Selecionando os dados
        const user = response.data[0];

        return user
    } catch (error) {
        console.error("Erro ao autenticar o login:", error);
    }
}


export const findByEmail = async (data) => {
    try {
        const response = await axios.get(urlUsers, {
            params: {
                email: data
            }
        });

        const user = response.data[0];

        if (user) {
            console.log(`Usuário encontrado ${user}`)
            return user
        }

        return
    } catch (error) {
        console.error("Erro ao buscar o email:", error);
    }
}

export const saveData = async (data) => {
    try {
        const response = await axios.post(urlUsers, data);
        console.log("Dados salvos com sucesso:", response.data);
    } catch (error) {
        console.error("Erro ao salvar os dados:", error);
    }
};

export const authSession = async (data) => {
    try {
        console.log(data)
        const validate = validateData(data)
        console.log(validate)
        if (!validate) {
            console.log('entrou no se for falso')
            return
        }
        
        const response = await axios.get(urlUsers, data);
        console.log(response)

        const user = response.data[0];
        console.log(user)

        if (user) {
            console.log(`Sessão encontrado ${user}`)
            return user
        }

        return
    } catch (error) {
        console.error("Erro ao autenticar sessão:", error);
    }
}