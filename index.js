const mysql = require('mysql');

exports.handler = (event, context, callback) => {
  // Configurações de conexão com o banco de dados MySQL
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database_name'
  });

  // Parâmetros de consulta
  const nome = event.queryStringParameters.nome;

  // Conexão com o banco de dados MySQL
  connection.connect();

  // Consulta SQL para buscar informações de alunos com base no nome
  const sql = 'SELECT * FROM alunos WHERE nome LIKE ?';
  const params = ['%' + nome + '%'];
  connection.query(sql, params, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    // Fechar a conexão com o banco de dados MySQL
    connection.end();
    // Transformar os resultados em formato JSON
    const jsonResults = JSON.stringify(results);
    // Retornar os resultados da consulta em formato JSON com o status code 200
    const response = {
      statusCode: 200,
      body: jsonResults
    };
    callback(null, response);
  });
};
