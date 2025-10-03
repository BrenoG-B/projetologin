import { useState } from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Register = () => {

  // HOOK- useState
  const [email,setEmail]=useState('');
  const [senha,setSenha]=useState('');
  const [message, setMessage]=useState('');
  //HOOK- useNavigate - navega entre os componentes
  const navigate = useNavigate();

  // criando a função handleRegister

  const handleRegister =async(e)=>{
    e.preventDefault(); //Previne que a página faça loading
    try{
      // BUSCANDO A API COM A FUNÇÃO AXIOS
      const response = await axios.post("http://localhost:5001/register", {email,senha})
      setMessage(response.data.message) //apresenta uma mensagem
      setTimeout(()=>navigate("/"),2000);
    }
    catch(erro){
      setMessage(erro.response.data.message || "Erro ao registar usuário")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <img></img>
      <div className="bg-white p-8 rounded-2xl shadow-md mb-6 w-full max-w-sm">
        <h2 className="text-2xl text-black-900 text-center mb-6 font-bold">Cadastro de usuário</h2>
        <h3 className="text-2x1 text-center mb-6 font-semibold hover:text-blue-800 hover:font-bold ">Tricolor Imortal</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-black font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-black font-bold">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button className="w-full bg-black text-white text-lg py-2 rounded-2xl hover:bg-blue-900 transition duration-300">Cadastrar</button>
        </form>

         {<p className="mt-4 text-center text-red-500">{message}</p>}
        <p className="mt-4 text-center" >
         Já tem uma conta? <a href="/" className="text-blue-500 hover:underline hover:text-yellow-600" >Faça Login</a>
        </p>
      </div>
    </div>
  )
}

export default Register