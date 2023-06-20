import bodyParser from 'body-parser';
import path from 'path';
import express from 'express';


export default function Conect(PORT, app, baseDir){
    // Configurar o diretório para os arquivos estáticos
    app.use(express.static(path.join(baseDir, 'src', 'public')));

    // Rota para renderizar a página index.html
    app.get('/', (req, res) => {
    res.sendFile(path.join(baseDir, 'src', 'public', 'index.html'));
    });

    // Middleware de processamento de corpo para analisar dados JSON
    app.use(bodyParser.json());

    app.post('/sign-up', (req, res) => {
        const { username, avatar } = req.body;
        console.log(username, avatar);
        res.send('Registro realizado com sucesso!');
    });

    app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
    });
}