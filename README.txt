Integrantes:
76310 - Clarel Spies
96627 - William Mehler

Ligar para acessar aplicativo:
Skype: +990009369990099367
Telefone : 55 51 35001727

Acesso ao banco de dados:
Usar o gerenciador phpmyadmin online em: http://www.phpmyadmin.co
Servidor: sql10.freemysqlhosting.net
Usuário: sql10149086
Senha: rZKnmc74a1

=======================================================================================================================
Arquivos:
Dentro da pasta da aplicação (voice-xml) está a aplicação desenvolvida em nodejs.

/docs:
voice.vxml (usado no site da voxeo, ele apenas redireciona a ligação para o servidor.)

/app/views:
cadastrar.ejs
erro_cadastro.ejs
menu.ejs
sucesso_consulta.ejs
consultar.ejs
erro_consulta.ejs
sucesso_cadastro.ejs
*São todas os xml usados para a parte de chamadas da aplicação estão em EJS pois é como o framework usado (express) as reconhece, mas a renderiza em vxml.

/app/controllers:
alunos.js
*É o controller da aplicação, la está disponível toda lógica js. (acesso bd, receber parametros da requisição post e redirecionar a ligação para sua respectiva view.)

=======================================================================================================================
Funcionamento:
Liga para a aplicação da voxeo e o arquivo voice.vxml redireciona a ligação para ENDERECO_SERVER/alunos/menu.
menu.ejs pede para você escolher entre CONSULTAR ou CADASTRAR.

=======================================================================================================================
SE CADASTRAR:
Vai para cadastrar.ejs
Aplicação pede o nome do aluno que vai cadastrar:
<grammar>[ willian luiza beto carol ]</grammar>

Depois é pedido a nota1 e nota2, uma de cada vez:
<grammar>
<![CDATA[ ( [ 0 1 2 3 4 5 6 7 8 9 ] ?(ponto [ 0 1 2 3 4 5 6 7 8 9 ]) ) 10 ]]>
</grammar>

Aceita-se entradas de 0.0 até 10, todas com 1 digito após o ponto. (com exceção do 10 )
BASICAMENTE FALE DE UMA DAS SEGUINTES MANEIRAS:
x
x ponto x
y

onde  0>= x <=9
y = 10

EXEMPLOS de fala para as notas:
dez (10)
nove ponto seis (9.6)
nove (9)
quatro ponto cinco (4.5)
zero ponto sete (0.7)
dez ponto um (0.1) (CASOS EM QUE VOCÊ FALA 10 PONTO X, ele reconhece o 10 como sendo 0... não consegui resolver iso.)

Então ele vai dar uma mensagem de sucesso (se o aluno ainda não estiver cadastrado) sucesso_cadastro.ejs
ou erro (se aluno já foi cadastrado) erro_cadastro.ejs
e então volta para o menu inicial.

=======================================================================================================================
SE CONSULTAR:
Vai para consultar.ejs
Aplicação pede o nome do aluno que vai consultar a nota:
<grammar>[ willian luiza beto carol ]</grammar>

Então a aplicação responde com o nome do aluno e a nota, caso já esteja cadastrado. sucesso_consulta.ejs
ou erro caso o aluno ainda não esteja cadastrado. erro_consulta.ejs
e então vola para o menu inicial.

=======================================================================================================================
PS: aluno "beto" já está cadastrado, caso deseje cadastrar ele novamente exclua no gerenciador do BD. Ou pode iniciar a aplicação consultando a nota dele.
