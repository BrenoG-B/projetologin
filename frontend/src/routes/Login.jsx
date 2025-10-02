import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5001";

const Login = () => {
  //HOOK - useState - manipula o estado da variável
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  //HOOK - useNavigate - redirecionamento entre os componentes
  const navigate = useNavigate();

  // FUNLÇAO HANDLELOGIN

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const response = await axios.post(`${API_URL}/login`, { email, senha });
      const token = response.data.token;

      if (token) {
        // pega o token do localstorage para valida o login
        localStorage.setItem("token", token);
        // caso o token esteja correto apresenta mensagem
        setMensagem("Login realizado com sucesso");
        //depois de 1 segundo chama a página dashboard
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMensagem("Erro autenticar token");
      }
    } catch (erro) {
      console.error("Erro ao logar", erro);
    }
  };

  return (
    <div className="bg-blue-400 ">
      <div className="">
        <h2 className="font-bold">Login</h2>
        <form onSubmit={handleLogin} >
          <div className="bg-blue-500">
            <label>Email</label>
            <input className="border flex"
              type="email"
              placeholder="digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="bg-blue-500">
            <label>Senha</label>
            <input className="border flex"
              type="password"
              placeholder="digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button className="font-bold bg-blue-300 h-8 w-18 text-center ">
            Entrar
          </button>
        </form>
        {mensagem && <p>{mensagem}</p>}
        <p>
          Não tem conta ? <a href="/register">Criar Conta</a>
        </p>
      </div>
    </div>
  );
};

export default Login;