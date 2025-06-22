import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import logoSomocar from '../images/rodape.png';
import axios from 'axios';

function AdminLogin() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/admin/login', {
        email: usuario,
        senha: senha
      });

      // Recebe o token
      const { token } = response.data;

      // Salvar token (pode ser localStorage ou sessionStorage)
      localStorage.setItem('token', token);

      // Redireciona para o dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      setErro('Usuário ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>OLÁ<br />GERENTE</h1>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'LOGIN'}
          </button>
        </form>
        {erro && <p className="error-message">{erro}</p>}
        <div className="login-footer">
          <img src={logoSomocar} alt="Logo Somocar" />
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
