// src/components/ListaPessoas.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listarPessoas } from '../../services/api'; // Importa do serviço

function ListaPessoas() {
    const [pessoas, setPessoas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function carregarPessoas() {
            try {
                setLoading(true);
                setError(null);
                const data = await listarPessoas();
                setPessoas(data);
            } catch (err) {
                setError(err.message || 'Erro ao carregar pessoas.');
            } finally {
                setLoading(false);
            }
        }
        carregarPessoas();
    }, []);

    if (loading) {
        return <div className="container mt-4"><p>Carregando pessoas...</p></div>;
    }

    if (error) {
        return <div className="container mt-4 alert alert-danger" role="alert">Erro: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Lista de Pessoas</h2>
            {pessoas.length === 0 ? (
                <p className="mt-3">Nenhuma pessoa cadastrada ainda.</p>
            ) : (
                <ul className="list-group mt-3">
                    {pessoas.map(pessoa => (
                        <Link
                            key={pessoa.id}
                            to={`/pessoa/${pessoa.id}`}
                            className="list-group-item list-group-item-action"
                        >
                            {pessoa.nome}
                        </Link>
                    ))}
                </ul>
            )}
            <Link to="/cadastro" className="btn btn-success mt-4">
                + Cadastrar Nova Pessoa
            </Link>
        </div>
    );
}

export default ListaPessoas;