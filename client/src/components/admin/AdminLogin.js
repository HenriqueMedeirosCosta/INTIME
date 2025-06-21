import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Usaremos o Axios para a chamada de API
import './AdminLogin.css';
import logoSomocar from '../images/rodape.png';

function AdminLogin() {
    const navigate = useNavigate();

    // Estados para controlar os campos do formulário
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    
    // Estados para feedback ao usuário
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        setLoading(true);
        setError(''); // Limpa erros anteriores

        try {
            // Fazendo a chamada POST para a sua API
            const response = await axios.post('http://localhost:3001/gerentes/login', {
                matricula: matricula,
                senha: senha
            });

            // Se o login for bem-sucedido (status 200)
            console.log(response.data.message); // Ex: "Login realizado com sucesso"
            setLoading(false);

            // Redireciona para o dashboard
            navigate('/admin/dashboard');

        } catch (err) {
            // Se a API retornar um erro (ex: 401 Credenciais inválidas)
            setLoading(false);
            setError(err.response?.data?.message || 'Erro de conexão. Tente novamente.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>OLÁ<br />GERENTE</h1>
                </div>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="matrícula:" 
                            value={matricula}
                            onChange={(e) => setMatricula(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder="senha:"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required 
                        />
                    </div>

                    {/* Exibe a mensagem de erro, se houver */}
                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Entrando...' : 'LOGIN'}
                    </button>
                </form>
                <div className="login-footer">
                    <img src={logoSomocar} alt="Logo Somocar" />
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;