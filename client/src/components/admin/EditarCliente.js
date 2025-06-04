// src/components/EditarPessoa.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buscarPessoaPorId, atualizarPessoa } from '../../services/api'; // Importa do serviço

function EditarPessoa() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ nome: '', idade: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); // Para erros de carregamento
    const [submitMessage, setSubmitMessage] = useState({ texto: '', tipo: '' }); // Para erros/sucesso de submissão

    useEffect(() => {
        async function carregarPessoaParaEdicao() {
            try {
                setLoading(true);
                setError('');
                setSubmitMessage({ texto: '', tipo: '' });
                const data = await buscarPessoaPorId(id);
                if (data) {
                    // Garante que idade seja string para o input type="number" se vier como número
                    setForm({ nome: data.nome, idade: String(data.idade), email: data.email });
                } else {
                    setError('Pessoa não encontrada para edição.');
                }
            } catch (err) {
                setError(err.message || 'Erro ao carregar dados para edição.');
            } finally {
                setLoading(false);
            }
        }
        if (id) {
            carregarPessoaParaEdicao();
        }
    }, [id]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmitMessage({ texto: '', tipo: '' });

        try {
            // Converte idade para número antes de enviar
            const dadosAtualizados = { ...form, idade: Number(form.idade) };
            await atualizarPessoa(id, dadosAtualizados);
            // Poderia exibir uma mensagem de sucesso aqui antes de navegar, ou apenas navegar
            // setSubmitMessage({ texto: '✅ Pessoa atualizada com sucesso!', tipo: 'success' });
            // setTimeout(() => navigate(`/pessoa/${id}`), 1500); // Atraso opcional para ver a mensagem
            navigate(`/pessoa/${id}`); // Navega para a página de detalhes
        } catch (err) {
            setSubmitMessage({ texto: `❌ Erro ao atualizar: ${err.message}`, tipo: 'danger' });
        }
    };

    if (loading) {
        return <div className="container mt-4"><p>Carregando dados para edição...</p></div>;
    }

    if (error) {
        return <div className="container mt-4 alert alert-danger" role="alert">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h3>Editar Pessoa (ID: {id})</h3>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input type="text" id="nome" name="nome" className="form-control" value={form.nome} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="idade" className="form-label">Idade</label>
                    <input type="number" id="idade" name="idade" className="form-control" value={form.idade} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input type="email" id="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
                </div>
                <button className="btn btn-warning" type="submit">Salvar Alterações</button>
            </form>

            {submitMessage.texto && (
                <div className={`alert alert-${submitMessage.tipo === 'success' ? 'success' : 'danger'} mt-3`} role="alert">
                    {submitMessage.texto}
                </div>
            )}
        </div>
    );
}

export default EditarPessoa;