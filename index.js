const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


//http://localhost:3000/saudacao?nome=bruno


app.post("/login", (req, res) => {
    const { email, senha } = req.body;
    if (!email && !senha ) {
        return res.status(404).json({ erro: "dados incompleto" })
    }
     if (email=='admin@admin.com' && senha == '123456'){
        res.json(
            {
                token:'123456'
            }
        )
     }else{
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