// src/components/Formulario.js
import React, { useState } from 'react';
import { adicionarPessoa } from '../../services/api'; // Importa do serviço

function Formulario() {
    const [form, setForm] = useState({ nome: '', idade: '', email: '' });
    const [mensagem, setMensagem] = useState({ texto: '', tipo: '' }); // {texto, tipo: 'success' ou 'danger'}

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem({ texto: '', tipo: '' });

        try {
            // Converte idade para número antes de enviar
            const dadosPessoa = { ...form, idade: Number(form.idade) };
            await adicionarPessoa(dadosPessoa);
            setMensagem({ texto: '✅ Pessoa cadastrada com sucesso!', tipo: 'success' });
            setForm({ nome: '', idade: '', email: '' }); // Limpa o formulário
        } catch (error) {
            setMensagem({ texto: `❌ Erro: ${error.message}`, tipo: 'danger' });
        }
    };

    return (
        <div className="container mt-4">
            <h3>Cadastro de Pessoa</h3>
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
                <button className="btn btn-primary" type="submit">Enviar</button>
            </form>

            {mensagem.texto && (
                <div className={`alert alert-${mensagem.tipo === 'success' ? 'success' : 'danger'} mt-3`} role="alert">
                    {mensagem.texto}
                </div>
            )}
        </div>
    );
}

export default Formulario;