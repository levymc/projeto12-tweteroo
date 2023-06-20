import bodyParser from 'body-parser';
import path from 'path';
import express from 'express';

class Conexao {
    constructor(PORT, app, baseDir) {
        this.PORT = PORT;
        this.app = app;
        this.baseDir = baseDir;
    }

    configurarDiretorioEstatico() {
        this.app.use(express.static(path.join(this.baseDir, 'src', 'public')));
    }

    configurarRotaIndex() {
        this.app.get('/', (req, res) => {
        res.sendFile(path.join(this.baseDir, 'src', 'public', 'index.html'));
        });
    }

    iniciarServidor() {
        this.app.listen(this.PORT, () => {
        console.log(`Servidor iniciado na porta ${this.PORT}`);
        });
    }
}

export default Conexao;
