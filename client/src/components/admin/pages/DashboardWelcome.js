import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  encerrarFila as apiEncerrarFila,
  gerarRelatorio as apiGerarRelatorio,
  iniciarNovaFila as apiIniciarNovaFila,
  buscarResumoFila as apiBuscarResumoFila
} from '../../../services/api';
import {
  FaUserCircle,
  FaCar,
  FaTools,
  FaStopCircle,
  FaFileAlt,
  FaSyncAlt
} from 'react-icons/fa';
import './DashboardWelcome.css';

function DashboardWelcome() {
  const navigate = useNavigate();
  const nomeGerente = "Gerente";

  const [stats, setStats] = useState({ aguardando: 0, emExecucao: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
  const intervalo = setInterval(() => {
  }, 60000); 

  return () => clearInterval(intervalo); 
    }, []);

  useEffect(() => {
  const carregarResumo = async () => {
    try {
      const response = await apiBuscarResumoFila();
      setStats(response.data);
    } catch (error) {
      console.error('Erro ao buscar resumo da fila:', error);
    }
  };

  carregarResumo();
}, []);

    
  const dataAtual = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const gerarRelatorio = async () => {
  try {
    const response = await apiGerarRelatorio();
    console.log("Resposta da API (blob):", response);
    const hoje = new Date().toISOString().slice(0, 10);
    downloadBlob(response.data, `relatorio_${hoje}.xlsx`);

    Swal.fire({
      icon: 'success',
      title: 'Relatório gerado e baixado com sucesso!',
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro ao gerar relatório',
      text: error.response?.data?.message || error.message || 'Tente novamente mais tarde.',
    });
  }
};


  const encerrarFila = async () => {
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: 'Encerrar fila?',
      text: 'Não esqueça de gerar o relatório antes de encerrar!',
      showCancelButton: true,
      confirmButtonText: 'Encerrar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;

    try {
      // Gerar relatório antes de encerrar
      await gerarRelatorio();

      await apiEncerrarFila();

      setStats({ aguardando: 0, emExecucao: 0 });

      Swal.fire({
        icon: 'success',
        title: 'Fila encerrada com sucesso!',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao encerrar fila',
        text: error.response?.data?.message || error.message || 'Tente novamente mais tarde.',
      });
    }
  };

  const iniciarNovaFila = async () => {
    const { isConfirmed } = await Swal.fire({
      icon: 'question',
      title: 'Iniciar nova fila?',
      text: 'Isso limpará a fila atual. Deseja continuar?',
      showCancelButton: true,
      confirmButtonText: 'Sim, iniciar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;

    try {
      await apiIniciarNovaFila();

      setStats({ aguardando: 0, emExecucao: 0 });

      Swal.fire({
        icon: 'success',
        title: 'Nova fila iniciada!',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao iniciar nova fila',
        text: error.response?.data?.message || error.message || 'Tente novamente mais tarde.',
      });
    }
  };

  return (
    <div className="dashboard-welcome">
      <header className="welcome-header">
        <div>
          <h2>Olá, {nomeGerente}!</h2>
          <p>Hoje é {dataAtual}. Aqui está o resumo da sua oficina.</p>
        </div>

        <div
          className="my-profile-container"
          ref={dropdownRef}
          onClick={toggleDropdown}
          tabIndex={0}
          role="button"
          onKeyDown={e => { if (e.key === 'Enter') toggleDropdown(); }}
        >
          <FaUserCircle size={32} />
          {dropdownOpen && (
            <div className="my-dropdown-menu">
              <button className="my-dropdown-item" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <section className="stats-container">
        <div
          className="stat-card clickable"
          onClick={() => navigate('/admin/dashboard/fila')}
          title="Ver fila de atendimento"
          tabIndex={0}
          role="button"
          onKeyDown={e => { if (e.key === 'Enter') navigate('/admin/dashboard/fila'); }}
        >
          <div className="stat-card-content">
            <FaCar className="stat-icon" />
            <div className="stat-text">
              <h3>{stats.aguardando}</h3>
              <p>Veículos na Fila</p>
            </div>
          </div>
        </div>

        <div
          className="stat-card clickable"
          onClick={() => navigate('/admin/dashboard/atendimento')}
          title="Ver serviços em execução"
          tabIndex={0}
          role="button"
          onKeyDown={e => { if (e.key === 'Enter') navigate('/admin/dashboard/em-execucao'); }}
        >
          <div className="stat-card-content">
            <FaTools className="stat-icon" />
            <div className="stat-text">
              <h3>{stats.emExecucao}</h3>
              <p>Serviços em Execução</p>
            </div>
          </div>
        </div>

        {/* Botões extras */}
        <div
          className="stat-card clickable"
          onClick={encerrarFila}
          title="Encerrar fila"
          tabIndex={0}
          role="button"
          onKeyDown={e => { if (e.key === 'Enter') encerrarFila(); }}
        >
          <div className="stat-card-content">
            <FaStopCircle className="stat-icon" />
            <div className="stat-text">
              <p>Encerrar fila</p>
            </div>
          </div>
        </div>

        <div
          className="stat-card clickable"
          onClick={gerarRelatorio}
          title="Gerar relatório"
          tabIndex={0}
          role="button"
          onKeyDown={e => { if (e.key === 'Enter') gerarRelatorio(); }}
        >
          <div className="stat-card-content">
            <FaFileAlt className="stat-icon" />
            <div className="stat-text">
              <p>Gerar relatório</p>
            </div>
          </div>
        </div>

        <div
          className="stat-card clickable"
          onClick={iniciarNovaFila}
          title="Iniciar nova fila"
          tabIndex={0}
          role="button"
          onKeyDown={e => { if (e.key === 'Enter') iniciarNovaFila(); }}
        >
          <div className="stat-card-content">
            <FaSyncAlt className="stat-icon" />
            <div className="stat-text">
              <p>Iniciar nova fila</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardWelcome;
