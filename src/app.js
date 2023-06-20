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

app.use(bodyParser.json());
app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;
    console.log("AQUII", username, avatar);
    res.send('Registro realizado com sucesso!');
});