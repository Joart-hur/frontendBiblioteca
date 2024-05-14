const alunoService = require('../services/alunoService')

module.exports = {
    buscarTodos: async (req, res) => {
        let json = {error:'', result:[]};
        let aluno = await aluno.alunoService.buscarTodos();
        for(let i in aluno){
            json.result.push({
                codigo: aluno[i].cod_aluno,
                curso: aluno[i].curso,
                serie: aluno[i].serie
            });
        }
        res.json(json);
    }
}