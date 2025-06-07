// Função para buscar a lista de clientes do nosso backend
export const listarClientes = async (idToken) => {
    try {
        // URL do nosso endpoint no backend
        const API_URL = 'http://localhost:3001/api/admin/clientes';

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Inclui o token de autenticação no cabeçalho
                'Authorization': `Bearer ${idToken}`
            }
        });

        if (!response.ok) {
            // Se a resposta não for de sucesso, tenta ler a mensagem de erro do backend
            const errorData = await response.json();
            throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
        }

        return await response.json(); // Retorna os dados (a lista de clientes)
    } catch (error) {
        console.error("Erro na chamada da API 'listarClientesAdmin':", error);
        // Re-lança o erro para que o componente possa pegá-lo
        throw error;
    }
  };