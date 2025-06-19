// client/src/components/admin/AdminLogin.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

// [CORREÇÃO DO DIRETÓRIO]
// O caminho correto para a imagem do rodapé
import logoSomocar from '../images/rodape.png'; 

function AdminLogin() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Por enquanto, o login apenas redireciona para o dashboard
        navigate('/admin/dashboard');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>OLÁ<br />GERENTE</h1>
                </div>
                <form className="login-form" onSubmit={handleLogin}>
                    <input type="text" placeholder="usuário" required />
                    <input type="password" placeholder="senha" required />
                    <button type="submit" className="login-button">LOGIN</button>
                </form>
                <div className="login-footer">
                    <img src={logoSomocar} alt="Logo Somocar" />
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;