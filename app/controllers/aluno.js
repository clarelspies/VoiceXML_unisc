var mysql = require("mysql");
var configuracoesBanco = {
    host: "sql10.freemysqlhosting.net",
    user: "sql10149086",
    password: "rZKnmc74a1",
    database: "sql10149086"
};

module.exports = function() {
    var controller = {};

    controller.menu = function(req, res) {
        res.render("menu");
    };

    controller.cadastrar = function(req, res) {
        res.render("cadastrar");
    };

    controller.consultar = function(req, res) {
        res.render("consultar");
    };

    controller.salva = function(req, res) {
        var aluno = req.body;

        aluno.nota1 = +aluno.nota1.replace(" ponto ", ".");
        aluno.nota2 = +aluno.nota2.replace(" ponto ", ".");

        if (aluno.nota1 > 10) {
            aluno.nota1 = 10;
        }

        if (aluno.nota2 > 10) {
            aluno.nota2 = 10;
        }

        aluno.media = parseFloat((aluno.nota1 + aluno.nota2) / 2).toFixed(2);

        var con = mysql.createConnection(configuracoesBanco);
        con.query('INSERT INTO notas SET ?', aluno, function(err, result) {
            if (err) {
                console.log(err);
                res.render("erro_cadastro");
            } else {
                res.render("sucesso_cadastro");
            }

        });

        con.end(function(err) {
            if (err) {
                console.log(err);
                return;
            }
        });

    };

    controller.consulta = function(req, res) {
        var nome = req.body.nome;

        var con = mysql.createConnection(configuracoesBanco);
        con.query('SELECT * FROM notas WHERE nome = ? limit 1', [nome], function(err, rows) {
            if (err || !!rows[0] == false) {
                console.log(err);
                res.render("erro_consulta");
            } else {
                var aluno = rows[0];

                aluno.media = aluno.media.toString().replace(".", " ponto ");

                res.render("sucesso_consulta", {
                    aluno: aluno
                });
            }

        });

        con.end(function(err) {
            if (err) {
                console.log(err);
                return;
            }
        });

    };

    return controller;
}
