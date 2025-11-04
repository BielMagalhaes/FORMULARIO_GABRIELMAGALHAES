import express from "express";
const server = express();
var listaPruduto = [];

server.use(express.urlencoded({ extended: true }));

const host = "localhost";
const porta = 3000;

server.get("/cadastro", (req, res) => {

    res.send(`<!DOCTYPE html>
                    <html lang="pt-BR">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Cadastro de Produto</title>
                    <style>
                        body {
                        font-family: Arial, sans-serif;
                        margin: 40px;
                        background-color: #f5f5f5;
                        }
                        form {
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        max-width: 400px;
                        margin: auto;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        }
                        label {
                        display: block;
                        margin-top: 10px;
                        }
                        input, textarea, select {
                        width: 100%;
                        padding: 8px;
                        margin-top: 5px;
                        }
                        button {
                        margin-top: 15px;
                        padding: 10px;
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        }
                        button:hover {
                        background-color: #45a049;
                        }
                    </style>
                    </head>
                    <body>
                    <h1>Cadastro de Produto</h1>
                    <form method="POST" action="/cadastrarproduto">
                        <label for="nomeProduto">Nome do Produto:</label>
                        <input type="text" id="nomeProduto" name="nomeProduto" required>

                        <label for="categoria">Categoria:</label>
                        <select id="categoria" name="categoria" required>
                        <option value="">Selecione...</option>
                        <option value="Suplemento">Suplemento</option>
                        <option value="Vitaminas">Vitaminas</option>
                        <option value="Acessórios">Acessórios</option>
                        </select>

                        <label for="preco">Preço (R$):</label>
                        <input type="number" id="preco" name="preco" step="0.01" required>

                        <label for="quantidade">Quantidade em Estoque:</label>
                        <input type="number" id="quantidade" name="quantidade" required>

                        <label for="descricao">Descrição:</label>
                        <textarea id="descricao" name="descricao" rows="4"></textarea>

                        <button type="submit">Cadastrar Produto</button>
                    </form>
                    </body>
                    </html>
`)
});
server.post('/cadastrar-produto', (req, res) => {
    const { nomeProduto, categoria, preco, quantidade, descricao } = req.body;
    listaPruduto.push({nomeProduto,categoria,preco,quantidade,descricao});
    res.redirect("/listaProduto");
});
server.get("/listaProduto",(req, res)=>{
    let conteudo = `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                        </head>
                        <body>
                            <h1>Produto Cadastrado com Sucesso!</h1>
                                <p><strong>Nome:</strong> ${nomeProduto}</p>
                                <p><strong>Categoria:</strong> ${categoria}</p>
                                <p><strong>Preço:</strong> R$ ${preco}</p>
                                <p><strong>Quantidade:</strong> ${quantidade}</p>
                                <p><strong>Descrição:</strong> ${descricao}</p>
                            <a href="/cadastroproduto">Voltar</a>
                        </body>
                        </html>`;
    for(let i=0;i< listaPruduto.length;i++){
        conteudo+=`
            <tr>
                <td>${listaPruduto[i].nomeProduto}</td>
                <td>${listaPruduto[i].categoria}</td>
                <td>${listaPruduto[i].preco}</td>
                <td>${listaPruduto[i].quantidade}</td>
                <td>${listaPruduto[i].descricao}</td>
            </tr>
        `;
    }
    conteudo+=`
            </body>
        </html>
    `

    res.send(conteudo);
});

server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
