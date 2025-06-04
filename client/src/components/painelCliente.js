// src/components/DetalhePessoa.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { buscarPessoaPorId, excluirPessoa } from '../services/api'; // Importa do serviço

function DetalhePessoa() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pessoa, setPessoa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);


    useEffect(() => {
        async function carregarDetalhes() {
            try {
                setLoading(true);
                setError(null);
                setDeleteError(null);
                const data = await buscarPessoaPorId(id);
                setPessoa(data);
            } catch (err) {
                setError(err.message || 'Erro ao carregar detalhes da pessoa.');
                setPessoa(null); // Garante que não haja dados antigos em caso de erro
            } finally {
                setLoading(false);
            }
        }
        if (id) {
            carregarDetalhes();
        }
    }, [id]);

    const handleDelete = async () => {
        const confirmar = window.confirm("Tem certeza que deseja excluir esta pessoa?");
        if (!confirmar) return;
        setDeleteError(null);

        try {
            await excluirPessoa(pessoa.id);
            alert('Pessoa excluída com sucesso!');
            navigate('/'); // Redireciona para a lista após exclusão
        } catch (err) {
            setDeleteError(err.message || 'Erro ao excluir pessoa.');
            alert(`Erro ao excluir pessoa: ${err.message}`); // Mantém o alerta ou usa a mensagem no estado
        }
    };

    if (loading) {
        return <div className="container mt-4"><p>Carregando...</p></div>;
    }

    if (error) {
        return <div className="container mt-4 alert alert-danger" role="alert">Erro: {error}</div>;
    }

    if (!pessoa) {
        // Isso pode acontecer se o buscarPessoaPorId retornar null ou se houver um erro não capturado
        // ou se o ID for inválido e a API retornar 404, que o setError capturaria.
        return <div className="container mt-4 alert alert-warning" role="alert">Pessoa não encontrada.</div>;
    }


    return (
        <div className="container mt-4">
            <h3>Detalhes de {pessoa.nome}</h3>
            <ul className="list-group mt-3">
                <li className="list-group-item">ID: {pessoa.id}</li>
                <li className="list-group-item">Idade: {pessoa.idade}</li>
                <li className="list-group-item">Email: {pessoa.email}</li>
            </ul>

            {deleteError && (
                <div className="alert alert-danger mt-3" role="alert">
                    Erro ao excluir: {deleteError}
                </div>
            )}

            <div className="mt-3">
                <Link to={`/editar/${pessoa.id}`} className="btn btn-warning me-2">
                    ✏️ Editar
                </Link>
                <button onClick={handleDelete} className="btn btn-danger">
                    🗑️ Excluir
                </button>
            </div>
            <Link to="/" className="btn btn-secondary mt-4 d-block">
                ← Voltar para lista
            </Link>
        </div>
    );
}

export default DetalhePessoa;