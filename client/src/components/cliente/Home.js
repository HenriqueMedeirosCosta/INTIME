// src/components/cliente/Home.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Estilo da tela inicial
import logoInTime from '../images/logo.png'; // mesmo caminho usado na Admin

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/cadastro');
    }, 2000); // mesmo tempo de 2 segundos

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="home-container">
      <img
        src={logoInTime}
        alt="Logo In Time"
        className="home-logo"
      />
    </div>
  );
}

export default Home;
