const { default: axios } = require("axios")


const findByEmail = async (url) => {
    const response = await axios.get(url, {
        params: {
            email: email
        }
    });

    const user = response.data[0];

    if (user) {
        console.log(`Usuário encontrado ${user}`)
        return user
    }

    return
}

const saveData = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        console.log("Dados salvos com sucesso:", response.data);
    } catch (error) {
        console.error("Erro ao salvar os dados:", error);
    }
};