// src/components/ListaClientes.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listarClientes } from '../../services/api'; // Importa a nova função de API
import { useAuth } from '../contexts/AuthContext';    // Para pegar o usuário e o token

function ListaClientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth(); // Pega o usuário do contexto de autenticação

    useEffect(() => {
        async function carregarClientes() {
            if (!currentUser) {
                setError("Acesso restrito. Por favor, faça o login.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Pega o ID Token do usuário logado para provar sua identidade ao backend
                const idToken = await currentUser.getIdToken();

                // Chama nossa função de API, passando o token para autorização
                const data = await listarClientes(idToken);

                setClientes(data);
            } catch (err) {
                // O erro pode ser de rede ou a mensagem de 'Acesso negado' do nosso backend
                setError(err.message || 'Ocorreu um erro ao carregar os dados.');
            } finally {
                setLoading(false);
            }
        }

        carregarClientes();
    }, [currentUser]); // Recarrega a lista se o usuário logado mudar

    // --- Renderização do Componente (igual ao exemplo anterior) ---
    if (loading) {
        return <div className="container mt-4"><p>Carregando clientes...</p></div>;
    }

    if (error) {
        return <div className="container mt-4 alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Painel de Clientes (Admin via API)</h2>
            {/* ... resto da lógica de renderização ... */}
            {clientes.length > 0 ? (
                <ul className="list-group mt-3">
                    {clientes.map(cliente => (
                        <Link key={cliente.id} to={`/cliente/${cliente.id}`} className="list-group-item list-group-item-action">
                            {cliente.nome} - Placa: {cliente.placa}
                        </Link>
                    ))}
                </ul>
            ) : <p>Nenhum cliente cadastrado.</p>}
        </div>
    );
}

export default ListaClientes;