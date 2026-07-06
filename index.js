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
const usuarioFile = path.join(__dirname, "usuarios.json")
function salvarUsuario(usuario) {
    fs.writeFileSync(usuarioFile, JSON.stringify(usuario, null, 2), "utf-8")
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

function lerUsuario() {
    if (!fs.existsSync(usuarioFile)) {
        return [];
    }
    const dados = fs.readFileSync(usuarioFile, 'utf-8')
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
    const usuario = lerUsuario()
    if (usuario.some(u => u.email === email) && usuario.some(u => u.email === email)) {
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
app.post("/usuarios", (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(404).json({ erro: "dados incompleto" })
    }
    const usuario = lerUsuario()
    if (usuario.some(u => u.email === email)) {
        return res.status(400).json({ erro: "usuario já cadastrado" })
    }
    const novoUsuario = { nome, email, senha };
    usuario.push(novoUsuario);
    salvarUsuario(usuario);
    return res.status(201).json({ mensagem: "usuario cadastrado com sucesso" })
})

// nao pronto
app.post("/pesquisarClientes", (req, res) => {
    const { pesquisarCPF } = req.body;
    if (!pesquisarCPF) {
        return res.status(404).json({ erro: "dados incompleto" })
    }
    const clientes = lerClientes()
    if (clientes.some(C => C.CPF == pesquisarCPF)) {
        return res.status(201).json({
            nome,
            CPF,
            CEP,
            rua,
            cidade,
            estado,
            numero
        })
    }
})







//finalzão
app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`)
})