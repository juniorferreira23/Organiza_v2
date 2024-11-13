import axios from "axios";
import { useRouter } from 'next/navigation';

const authLogin = async () => {
    const router = useRouter()

    try {
        const response = await axios.get(`http://localhost:3000/users`, {
          params: {
            email: email,
            password: password
          }
        });
  
        console.log(response)
  
        const user = response.data[0];
  
        console.log(user)
  
        if (user) {
          // Armazena o usuário no localStorage para simular uma sessão
          localStorage.setItem("user", JSON.stringify(user));
          router.push("pages/dashboard");
        } else {
          alert("Credenciais inválidas");
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao tentar fazer login");
      }
}

export default authLogin