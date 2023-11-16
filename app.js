// Importações e configurações iniciais (Express, Mongoose, Firebase)
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const firebase = require("firebase/app");
require("firebase/auth");

// Configuração do Firebase (inserir suas configurações do Firebase aqui)
const firebaseConfig = {
  apiKey: "AIzaSyDFt9rbCz9G-QxetDWfSfEPjC4m3ZE4Z1c",
  authDomain: "criancasemfoco-a0b2f.firebaseapp.com",
  projectId: "criancasemfoco-a0b2f",
  storageBucket: "criancasemfoco-a0b2f.appspot.com",
  messagingSenderId: "683066524349",
  appId: "1:683066524349:web:79187ddef2f8cbdc28edd4",
};
firebase.initializeApp(firebaseConfig);

function createLogin() {
  var nome1 = document.getElementById("nome1").value;
  var nome2 = document.getElementById("nome2").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var cep = document.getElementById("cep").value;
  var tel = document.getElementById("tel").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(nome1, nome2, email, password, cep, tel)
    .then((user) => {
      console.log("Usuário ", user);
      alert("Usuário criado. Login feito.");
    })
    .catch((error) => {
      alert("Não foi possível criar a conta!");
      console.log("Erro:", error);
    });
}

function loginEmail() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login Efetuado com sucesso!");
    })
    .catch((error) => {
      alert("Não foi possível fazer o login!");
      console.log("Erro:", error);
    });
}

// Conexão com MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/cadastro", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro na conexão com o MongoDB"));
db.once("open", function () {
  console.log("Conectado ao MongoDB");
});

// Esquema do Usuário no Mongoose
const usuarioSchema = new mongoose.Schema({
  nomeCrianca: String,
  nomeResponsavel: String,
  email: String,
  senha: String,
  cep: String,
  telefone: String,
});
const Usuario = mongoose.model("Usuario", usuarioSchema);

// Middlewares para análise de dados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Rota GET para servir a página de cadastro
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/cadastro.html");
});

// Rota POST para lidar com o cadastro
app.post("/cadastro.html", (req, res) => {
  const { nomeCrianca, nomeResponsavel, email, senha, cep, telefone } =
    req.body;

  // Criar usuário no Firebase
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      // Usuário criado no Firebase, agora salvamos no MongoDB
      const novoUsuario = new Usuario({
        nomeCrianca,
        nomeResponsavel,
        email, // Email do Firebase
        senha: userCredential.user.uid, // Usar UID como senha no MongoDB para referência
        cep,
        telefone,
      });

      novoUsuario
        .save()
        .then(() => res.send("Usuário cadastrado com sucesso!"))
        .catch((err) => res.status(500).send("Erro ao salvar no MongoDB"));
    })
    .catch((error) =>
      res.status(500).send("Erro ao criar usuário no Firebase")
    );
});

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}/`);
});
