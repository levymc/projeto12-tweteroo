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
global.arrayTweets = [];
global.userInfo = {
    username: "",
    avatar: ""
};
global.userTweet = {
    username: "",
    tweet: ""
};


app.use(bodyParser.json());

// Requisição de Acesso
app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    if ( !username || !avatar ) {
        res.status(400).send('Nada foi digitado nos campos de Usuário e/ou Avatar');
    }else{
        res.status(200).send('Ok');
    }

    userInfo = {    
        username: username,
        avatar: avatar
    }
    arrayUsers.push(userInfo)
    console.log("AQUII", arrayUsers);
});

// POST de novos Tweets
app.post('/tweets?', (req, res) => {
    const { tweet } = req.body;
    
    if ( !tweet ) {
        res.status(400).send('Nada foi digitado no campo Tweet');
    }else if ( !userInfo.username || !userInfo.avatar ){
        res.status(400).send('UNAUTHORIZED');
    }
    else{
        res.status(200).send('Parâmetros de tweet recebidos com sucesso!');
    }

    userTweet = {
        username: userInfo.username,
        tweet: tweet,
        avatar: userInfo.avatar
    }
    arrayTweets.push(userTweet);
    // console.log(arrayTweets);
});


// Requisição dos Tweets
app.get('/tweets', (req, res) => {
    const { page } = req.query;
    const pageSize = 10
    const startIndex = (parseInt(page) - 1) * pageSize
    const endIndex = startIndex + pageSize

    if (page){
        const tweetsForPage = arrayTweets.length >= 10 ? arrayTweets.slice(startIndex, endIndex) : arrayTweets
        console.log(arrayTweets);
        res.send(tweetsForPage);

    }else{
        const tweetsForPage = arrayTweets.slice(0, 9)
        console.log(arrayTweets);
        res.send(tweetsForPage);
    }
});

