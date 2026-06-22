const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const clientesFile = path.join(__dirname, "clientes.json")
function salvarClientes(clientes) {
    fs.writeFileSync(clientesFile, JSON.stringify(clientes, null, 2), "utf-8")
}

function lerClientes() {
    if (!fs.existsSync(clientesFile)) {
        return [];
    }
    const dados = fs.readFileSync(clientesFile, 'utf-8')
    try {
        return JSON.parse(dados) || [];
    } catch (error) {
        return []
    }
}
app.post("/clientes", (req, res) => {
    const { nome, CPF, CEP, rua, cidade, estado, numero } = req.body;
    if (!nome || !CPF || !CEP) {
        return res.status(404).json({ erro: "dados incompleto" })
    }
    const clientes = lerClientes()
    if (clientes.some(c => c.CPF === CPF)) {
        return res.status(400).json({ erro: "cliente já cadastrado" })
    }
    const novoCliente = { nome, CPF, CEP, rua, cidade, estado, numero };
    clientes.push(novoCliente);
    salvarClientes(clientes);
    return res.status(201).json({ mensagem: "cliente cadastrado com sucesso" })
})





//http://localhost:3000/saudacao?nome=bruno


app.post("/login", (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(404).json({ erro: "dados incompleto" })
    }
    if (email == 'admin@admin.com' && senha == '123456') {
        res.json(
            {
                token: '123456'
            }
        )
    } else {
        return res.status(404).json({ erro: "dados incorretos" })
    }



})
app.post("/imc", (req, res) => {
    const { nome, idade, altura, peso } = req.body;
    if (!nome && !idade && !altura && !peso) {
        return res.status(404).json({ erro: "dados incompleto" })
    }
    const imc = peso / (altura * altura);



    res.json({
        nome,
        idade,
        imc: imc.toFixed(2)
    })

})

app.post("/media", (req, res) => {
    const { nota1, nota2 } = req.body;
    if (!nota1 && !nota2) {
        return res.status(404).json({ erro: "dados incompleto" })
    }
    const media = (parseFloat(nota1) + parseFloat(nota2)) / 2;

    res.json({
        nota1,
        nota2,
        media: parseFloat(media)
    })
})

//finalzão
app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`)
})