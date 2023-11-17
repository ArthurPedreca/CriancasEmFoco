//requições
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname));

//configuração do express (server pra pagina e postman)

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
const port = 3000;

//configuração do servidor mongodb
//conecte o mongodb
mongoose.connect('mongodb://127.0.0.1:27017/criancasemfoco', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    serverSelectionTimeoutMS : 20000  
})


//criando a model solicitada
const UsuarioSchema = new mongoose.Schema({

    nomecrianca : {type: String},
    nomeresponsavel : {type: String},
    email : {type: String, required : true },
    password : {type: String},
    CEP : {type: String},
    telefone : {type: String},
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

//roteamento padrão

app.post("/cadastro", async(req, res)=>{
    const nomecrianca = req.body.nomecrianca;
    const nomeresponsavel = req.body.nomeresponsavel;
    const email = req.body.email;
    const password = req.body.password;
    const CEP = req.body.CEP;
    const telefone = req.body.telefone;

    const existingUser = await Usuario.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ error: "Usuário com este email já cadastrado." });
    }


    const usuario = new Usuario({
        nomecrianca : nomecrianca,
        nomeresponsavel : nomeresponsavel,
        email : email,
        password : password,
        CEP : CEP,
        telefone : telefone
    })

    try {
        const newUsuario = await usuario.save();

        res.sendFile(__dirname + "/index.html");
    }
    catch(error){
        res.status(400).json({error});
    }
});

app.get("/cadastro", async(req, res)=>{
    res.sendFile(__dirname + "/cadastro.html")
})

 
 //roteamento padrão 

app.get("/", async(req, res)=>{
    res.sendFile(__dirname + "/index.html")
});


app.listen(port, ()=>{
    console.log(`servidor rodando na porta ${port}`)
})