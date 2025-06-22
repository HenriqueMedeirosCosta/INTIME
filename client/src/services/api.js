// client/src/service/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/admin', 
});

// Adiciona token JWT automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funções específicas da API
export const encerrarFila = () => api.delete('/clientes');

export const gerarRelatorio = () =>
  api.get('/relatorio', { responseType: 'blob' });

export const iniciarNovaFila = () => api.post('/fila');

export const buscarResumoFila = () => api.get('/resumo');

export const listarClientes = () => api.get('/clientes');

export const buscarClientePorId = async (senha) => {
  const response = await api.get(`/clientes/${senha}`);
  return response.data;
};

export const atualizarCliente = (senha, data) => api.put(`/clientes/${senha}`, data)

export default api;
