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

let sessionCounter = 0;
global.arrayUsers = [];
global.arrayTweets = [
    // {
	// 	username: "bobesponja",
	// 	avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
	// 	tweet: "Eu amo hambúrguer de siri!"
	// },
    // {
	// 	username: "bobesponja",
	// 	avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
	// 	tweet: "Eu amo hambúrguer de siri!"
	// },
    // {
	// 	username: "bobesponja",
	// 	avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
	// 	tweet: "Eu amo hambúrguer de siri!"
	// },
    // {
	// 	username: "bobesponja",
	// 	avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
	// 	tweet: "Eu amo hambúrguer de siri!"
	// },
    // {
	// 	username: "bobesponja",
	// 	avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
	// 	tweet: "Eu amo hambúrguer de siri!"
	// },
    // {
	// 	username: "bobesponja",
	// 	avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
	// 	tweet: "Eu amo hambúrguer de siri!"
	// },
    // {
	// 	username: "bobesponja",
	// 	avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
	// 	tweet: "Eu amo hambúrguer de siri!"
	// },
    // {
	// 	username: "bobesponja",
	// 	avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
	// 	tweet: "Eu amo hambúrguer de siri!"
	// },
    // {
	// 	username: "levy",
	// 	avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
	// 	tweet: "Eu amo hambúrguer de siri!"
	// },
    // {
	// 	username: "bobesponja",
	// 	avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
	// 	tweet: "Eu amo hambúrguer de siri!"
	// },
    // {
	// 	username: "bobesponja",
	// 	avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
	// 	tweet: "Eu amo hambúrguer de siri!"
	// },
];
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
    const { username, avatar } = req.body

    if ( !username || !avatar || typeof username != 'string' || typeof avatar != 'string' ) {
        res.status(400).send('BAD REQUEST')
    }else{
        userInfo = {    
            username: username,
            avatar: avatar
        }
        if (!arrayUsers.find(element => element.username == userInfo.username)){
            arrayUsers.push(userInfo)
        }
        console.log("AQUII", arrayUsers, `Contador: ${sessionCounter}`);
        res.status(201).send('Ok')
    }
});

// POST de novos Tweets
app.post('/tweets?', (req, res) => {
    const { tweet } = req.body;
    const { user } = req.headers
    console.log("User:", user)
    
    if ( !tweet || typeof tweet != 'string'  ) {
        res.status(400).send('Nada foi digitado no campo Tweet');
    }else if ( !arrayUsers.find(element => element.username == user) ){
        res.status(401).send("UNAUTHORIZED")
    }else{
        userTweet = {
            username: user,
            tweet: tweet,
            avatar: arrayUsers.find(element => element.username == user).avatar
        }
        arrayTweets.push(userTweet);
        console.log(arrayTweets)
        res.status(201).send('Parâmetros de tweet recebidos com sucesso!')
    }
});


// Requisição dos Tweets
app.get('/tweets', (req, res) => {
    const { page } = req.query;
    const pageSize = 10
    const startIndex = (parseInt(page) - 1) * pageSize
    const endIndex = startIndex + pageSize
    console.log(page, startIndex, endIndex)

    if ( page ){
        const tweetsForPage = arrayTweets.length >= 10 ? arrayTweets.slice(startIndex, endIndex) : arrayTweets
        console.log(arrayTweets);
        if ( typeof parseInt(page) != "number" || page < 1 ){
            res.status(400).send("BAD REQUEST")
        }else{
            res.send(tweetsForPage);
        }

    }else{
        const tweetsForPage = arrayTweets.slice(0, 10)
        console.log(arrayTweets);
        res.send(tweetsForPage);
    }
});

app.get('/tweets/:user', (req, res) => {
    const { user } = req.params
    console.log(user)
    if ( user ){
        const tweetsUser = []
        arrayTweets.forEach(element => {
            element.username === user && tweetsUser.push(element)  
        })
        console.log(tweetsUser)
        res.status(200).send(tweetsUser)
    }else{
        res.send([""])
    }
})
