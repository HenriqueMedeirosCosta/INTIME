const express = require('express');
const cors = require('cors');
require('dotenv').config();


const clientesRoutes = require('./routes/clientesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/clientes', clientesRoutes);

app.get('/', (req, res) => {
    res.send('API InTime funcionando!');
});

app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
});
