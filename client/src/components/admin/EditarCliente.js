import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buscarClientePorId, atualizarCliente } from '../../services/api';

function EditarCliente() {
  const { senha } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    carro: '',
    placa: '',
    servico: '',
    status: '',
    horaInicio: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitMessage, setSubmitMessage] = useState({ texto: '', tipo: '' });

  useEffect(() => {
    async function carregarCliente() {
      try {
        setLoading(true);
        const cliente = await buscarClientePorId(senha);
        setForm(cliente);
      } catch (err) {
        console.error('Erro ao carregar:', err);
        setError('Erro ao carregar dados do cliente.');
      } finally {
        setLoading(false);
      }
    }

    carregarCliente();
  }, [senha]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleIniciarAtendimento = async (e) => {
    e.preventDefault();
    try {
        const agora = new Date();
    const horaFormatada = agora.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
      const dadosAtualizados = { ...form, status: 'Em atendimento',horaInicio: horaFormatada };
        
      await atualizarCliente(senha, dadosAtualizados);
      navigate('/admin/dashboard/atendimento');
    } catch (err) {
      console.error('Erro ao atualizar cliente:', err);
      setSubmitMessage({ texto: '❌ Erro ao iniciar atendimento.', tipo: 'danger' });
    }
  };

  if (loading) return <p className="container mt-4">Carregando cliente...</p>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h3>Editar Cliente (Senha: {senha})</h3>
      <form onSubmit={handleIniciarAtendimento} className="mt-3">
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input type="text" id="nome" name="nome" className="form-control" value={form.nome} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">Telefone</label>
          <input type="text" id="telefone" name="telefone" className="form-control" value={form.telefone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="carro" className="form-label">Carro</label>
          <input type="text" id="carro" name="carro" className="form-control" value={form.carro} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="placa" className="form-label">Placa</label>
          <input type="text" id="placa" name="placa" className="form-control" value={form.placa} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="servico" className="form-label">Serviço</label>
          <input type="text" id="servico" name="servico" className="form-control" value={form.servico} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-success">Iniciar Atendimento</button>
      </form>

      {submitMessage.texto && (
        <div className={`alert alert-${submitMessage.tipo} mt-3`} role="alert">
          {submitMessage.texto}
        </div>
      )}
    </div>
  );
}

export default EditarCliente;
