import express from 'express';
import Conect from './conec.js';


const PORT = 5000;
const app = express();
const baseDir = process.cwd();

Conect(PORT, app, baseDir)
