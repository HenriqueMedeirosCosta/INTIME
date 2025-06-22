const Cliente = require('../Model/ClienteModel');
const exceljs = require('exceljs');

exports.iniciarFila = async (req, res) => {
  try {
    const resultado = await Cliente.iniciarFila();
    
    if (resultado) {
      return res.status(201).json({ mensagem: 'Fila iniciada com sucesso.' });
    } else {
      return res.status(500).json({ erro: 'Falha ao iniciar a fila.' });
    }

  } catch (error) {
    console.error('[Erro iniciarFila]:', error);
    res.status(500).json({ erro: 'Erro interno ao tentar iniciar a fila.' });
  }
};

exports.obterResumoFila = async (req, res) => {
  try {
    const clientes = await Cliente.listarTodos();
    let aguardando = 0;
    let emExecucao = 0;
    let finalizado = 0; 

    clientes.forEach(cliente => {
      if (cliente.status === 'Aguardando') aguardando++;
      if (cliente.status === 'Em atendimento') emExecucao++;
      if (cliente.status === 'Finalizado') finalizado++;
    });

    res.status(200).json({ aguardando, emExecucao });
  } catch (error) {
    console.error('[Erro obterResumoFila] ', error);
    res.status(500).json({ erro: 'Não foi possível buscar o resumo' });
  }
};

exports.listarTodosClientes = async (req, res) => {
  try {
    const clientes = await Cliente.listarTodos();
    res.json(clientes);
    console.log(clientes);
  } catch (error) {
    console.error('[Erro ListarTodos]', error);
    res.status(500).json({ erro: 'Erro ao listar clientes.' });
  }
};

exports.atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const novosDados = req.body;
  
  try {
    const atualizado = await Cliente.atualizarCliente(id, novosDados);
    if (!atualizado) return res.status(404).json({ erro: 'Cliente não encontrado.' });

    res.json({ mensagem: 'Cliente atualizado com sucesso.' });
  } catch (error) {
    console.error('[Erro AtualizarCliente]', error);
    res.status(500).json({ erro: 'Erro ao atualizar cliente.' });
  }
};

exports.finalizarAtendimento = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log("ID: ", id, "Status: ", status);
  try {
    const cancelado = await Cliente.atualizarStatus(id, status);
        if(!cancelado) return res.status(404).json({ erro: 'não foi possivel finalizar seu atendimento'});
        res.json({ message: 'Atendimento finalizado!'});
  }catch (error){
    console.error('[Erro FinalizarAtendimento]', error);
    res.status(500).json({ erro: 'Erro ao finalizar o atendimento'});
  }
};

exports.resetarBanco = async (req, res) => {
  try {
    await Cliente.deletarTodos();
    res.json({ mensagem: 'Todos os clientes foram deletados.' });
  } catch (error) {
    console.error('[Erro ResetarBanco]', error);
    res.status(500).json({ erro: 'Erro ao resetar banco de dados.' });
  }
};

exports.gerarRelatorioExcel = async (req, res) => {
  try {
    const clientes = await Cliente.listarTodos();

    const workbook = new exceljs.Workbook();
    const hoje = new Date();
    const yyyy = hoje.getFullYear();
    const mm = String(hoje.getMonth() + 1).padStart(2, '0');
    const dd = String(hoje.getDate()).padStart(2, '0');
    const nomeArquivo = `relatorio-${dd}-${mm}-${yyyy}.xlsx`;
    const tituloPlanilha = `relatorio-${dd}-${mm}-${yyyy}`;
    const sheet = workbook.addWorksheet(tituloPlanilha);

    sheet.columns = [
      { header: 'Nome', key: 'nome', width: 30 },
      { header: 'Telefone', key: 'telefone', width: 20 },
      { header: 'Carro', key: 'carro', width: 20 },
      { header: 'Placa', key: 'placa', width: 15 },
      { header: 'Serviço', key: 'servico', width: 25 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Hora de Início', key: 'horaInicio', width: 15 },
      { header: 'Data Cadastro', key: 'dataCadastro', width: 25 },
    ];

    clientes.forEach(cliente => {
      

      sheet.addRow({
        nome: cliente.nome,
        telefone: cliente.telefone,
        carro: cliente.carro,
        placa: cliente.placa,
        servico: cliente.servico,
        status: cliente.status,
        horaInicio: cliente.horaInicio || '',
        dataCadastro: cliente.dataCadastro,
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${nomeArquivo}`);

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).json({ erro: 'Erro ao gerar relatório' });
  }
};
