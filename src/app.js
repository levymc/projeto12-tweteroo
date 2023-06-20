import express from 'express';
import Conexao from './conn.js';
import bodyParser from 'body-parser';


const PORT = 5000;
const app = express();
const baseDir = process.cwd();

const conexao = new Conexao(PORT, app, baseDir);
conexao.configurarDiretorioEstatico();
conexao.configurarRotaIndex();
conexao.iniciarServidor();

global.arrayUsers = [];
global.userInfo = {
    username: "",
    avatar: ""
};
global.userTweet = {
    username: "",
    avatar: ""
};

app.use(bodyParser.json());

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;
    userInfo = {
        username: username,
        avatar: avatar
    }
    arrayUsers.push(userInfo)
    console.log("AQUII", arrayUsers);
    res.send('Ok');
});

app.get('/tweets', (req, res) => {
    const { username, tweet } = req.body;
    // Faça algo com os parâmetros recebidos...
    // Por exemplo, você pode salvar o tweet em um banco de dados ou processá-lo de alguma outra forma.
    console.log(`Username: ${username}`);
    console.log(`Tweet: ${tweet}`);
  
    // Envie uma resposta para a requisição
    res.send('Parâmetros de tweet recebidos com sucesso!');
  });
  