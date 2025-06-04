// src/services/api.js

const BASE_URL = 'http://localhost:3001';
// NOTA: Em um ambiente de produção, esta chave de API deve ser gerenciada
// de forma mais segura, por exemplo, através de variáveis de ambiente
// e, idealmente, as chamadas que a utilizam seriam feitas por um backend.
const API_KEY = 'minha-chave-secreta-123';

const baseHeaders = {
    'x-api-key': API_KEY
};

async function handleResponse(response) {
    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            // Sem corpo JSON ou falha ao parsear
            errorData = { message: response.statusText || `Erro HTTP ${response.status}` };
        }
        const errorMessage = errorData?.erro || errorData?.message || `Erro desconhecido (Status: ${response.status})`;
        throw new Error(errorMessage);
    }

    // Para respostas 204 No Content (comuns em DELETE)
    if (response.status === 204) {
        return null; // Ou { success: true } se preferir um retorno explícito
    }
    return response.json();
}

export async function listarPessoas() {
    const response = await fetch(`${BASE_URL}/pessoas`, {
        headers: baseHeaders
    });
    return handleResponse(response);
}

export async function buscarPessoaPorId(id) {
    // Nota: Esta função assume que sua API tem um endpoint para buscar uma pessoa por ID.
    // Se não tiver, a lógica de buscar todas e filtrar no frontend (como nos componentes originais)
    // precisaria ser mantida nos componentes, ou esta função adaptada.
    // Vou assumir que o endpoint existe para otimizar DetalhePessoa e EditarPessoa.
    const response = await fetch(`${BASE_URL}/pessoas/${id}`, {
        headers: baseHeaders
    });
    return handleResponse(response);
}

export async function adicionarPessoa(pessoa) {
    const response = await fetch(`${BASE_URL}/pessoas`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoa)
    });
    return handleResponse(response);
}

export async function atualizarPessoa(id, pessoa) {
    const response = await fetch(`${BASE_URL}/pessoas/${id}`, {
        method: 'PUT',
        headers: {
            ...baseHeaders,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoa)
    });
    return handleResponse(response);
}

export async function excluirPessoa(id) {
    const response = await fetch(`${BASE_URL}/pessoas/${id}`, {
        method: 'DELETE',
        headers: baseHeaders
    });
    return handleResponse(response);
}