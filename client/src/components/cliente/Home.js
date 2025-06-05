// src/components/cliente/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Estilos separados para animação

function Home() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      navigate('/cadastro');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <img
        src={require('../images/logo.png')}
        alt="Logo do Projeto In Time"
        className={`splash-logo ${visible ? 'fade-in' : ''}`}
      />
    </div>
  );
}

export default Home;
