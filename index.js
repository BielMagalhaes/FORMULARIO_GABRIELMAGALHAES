import express from "express";
const server = express();


const host = "0.0.0.0";
const porta = 3000;


server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
