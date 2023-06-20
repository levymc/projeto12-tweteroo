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
global.arrayTweets = [
	{
		username: "bobesponja",
		avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
		tweet: "Eu amo hambúrguer de siri!"
	}
];
global.userInfo = {
    username: "",
    avatar: ""
};
global.userTweet = {
    username: "",
    tweet: ""
};
global.newUserTweet;


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

app.post('/tweets', (req, res) => {
    const { tweet } = req.body;

    userTweet = {
        username: userInfo.username,
        tweet: tweet,
        avatar: userInfo.avatar
    }

    // let avatar = '';
    // for (const user of arrayUsers) {
    //     if (user.username === username) {
    //     avatar = user.avatar;
    //     break;
    //     }
    // }

    // newUserTweet = {
    //     username: username,
    //     tweet: tweet,
    //     avatar: avatar
    // }
    arrayTweets.push(userTweet)
    console.log(arrayTweets)
    res.send('Parâmetros de tweet recebidos com sucesso!');

})

app.get('/tweets', (req, res) => {
    res.send(arrayTweets);
});