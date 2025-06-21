const express = require('express');
const cors = require('cors');
require('dotenv').config();

const clientesRoutes = require('./routes/clientesRoutes');
// [NOVO] Importando as rotas do gerente
const gerentesRoutes = require('./routes/gerentesRoutes'); 

const app = express();
// Sua porta deve ser diferente da do React. Se o React usa 3000, o servidor pode usar 3001.
const PORT = process.env.PORT || 3001; 

app.use(cors());
app.use(express.json());

app.use('/clientes', clientesRoutes);
// [NOVO] Registrando as rotas do gerente no caminho /gerentes
app.use('/gerentes', gerentesRoutes); 

app.get('/', (req, res) => {
  res.send('API InTime funcionando!');
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});