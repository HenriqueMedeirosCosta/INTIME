// client/src/components/cliente/StatusCliente.js (VERSÃO COMPLETA)

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './StatusCliente.css'; // Criaremos um CSS para deixar a página profissional

import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import logoSomocar from '../images/rodape.png';

function StatusCliente() {
    const { id } = useParams(); // Pega o ID da URL, ex: cBTTQjJ4im9e9KkBy1gv
    
    const [atendimento, setAtendimento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) {
            setError('Nenhum ID de atendimento fornecido.');
            setLoading(false);
            return;
        }

        const fetchAtendimento = async () => {
            setLoading(true);
            try {
                // 1. Cria a referência para o documento específico na coleção 'clientes'
                const docRef = doc(db, 'clientes', id);
                
                // 2. Busca o documento no Firestore
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // 3. Se o documento existe, salva os dados no estado
                    setAtendimento(docSnap.data());
                } else {
                    // 4. Se não existe, define uma mensagem de erro
                    setError('Atendimento não encontrado. Verifique o link ou sua senha.');
                }
            } catch (err) {
                console.error("Erro ao buscar atendimento:", err);
                setError('Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.');
            } finally {
                // 5. Garante que o 'loading' termine, mesmo em caso de erro
                setLoading(false);
            }
        };

        fetchAtendimento();
    }, [id]); // O useEffect roda sempre que o 'id' da URL mudar

    // Função para abrir o WhatsApp com uma mensagem pré-definida
    const openWhatsApp = () => {
        if (!atendimento) return;
        const telefoneOficina = '5561000000000'; // SUBSTITUA PELO NÚMERO DA OFICINA
        const mensagem = `Olá, gostaria de informações sobre o serviço do veículo ${atendimento.carro}, senha ${atendimento.senha}.`;
        const url = `https://api.whatsapp.com/send?phone=${telefoneOficina}&text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    };

    if (loading) {
        return <div className="status-page-container"><p>Carregando...</p></div>;
    }

    if (error) {
        return <div className="status-page-container"><p className="error-message">{error}</p></div>;
    }

    return (
        <div className="status-page-container">
            <img src={logoSomocar} alt="Logo Somocar" className="logo-somocar-status" />
            <div className="status-card">
                <div className="status-header">
                    <h2>Detalhes do Atendimento</h2>
                </div>
                <div className="status-body">
                    <p><strong>Senha:</strong> <span className="senha-destaque">{atendimento.senha}</span></p>
                    <p><strong>Veículo:</strong> {atendimento.carro}</p>
                    <p><strong>Serviço Solicitado:</strong> {atendimento.servico}</p>
                    <p><strong>Status:</strong> <span className={`status-tag status-${atendimento.status?.toLowerCase()}`}>{atendimento.status}</span></p>
                </div>
                <div className="status-footer">
                    <button onClick={openWhatsApp} className="whatsapp-button">
                        Acompanhar no WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StatusCliente;