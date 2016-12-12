module.exports = function(app) {
    var controller = app.controllers.aluno;

    app.post("/alunos/salva", controller.salva);
    app.post("/alunos/consulta", controller.consulta);

    app.get("/alunos/menu", controller.menu);
    app.get("/alunos/cadastrar", controller.cadastrar);
    app.get("/alunos/consultar", controller.consultar);
}
