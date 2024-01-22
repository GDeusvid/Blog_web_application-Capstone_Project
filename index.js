// imports
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";

// códigos iniciais
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
  secret: 'sua-chave-secreta-aqui',
  resave: true,
  saveUninitialized: true
}));
 
// Protocolos http
app.get("/", (req, res) => {
  const dadosuser = req.session.userinfo || {
    nameuser: 'Seu nome...',
    biouser: 'Escreva sua bio...'
  };
  req.session.userinfo = dadosuser;
    res.render("index.ejs",dadosuser);
  });

  
  app.post('/userinfo', (req, res) => {
    // O corpo da solicitação contém os dados enviados pelo AJAX
    const dadosuser = req.body;

  // Armazenar os dados na sessão
    req.session.userinfo = dadosuser;
    
    // Aqui você pode fazer o que for necessário com os dados do POST
    console.log('Dados recebidos via POST USER INFO:', dadosuser);

    // Responder ao cliente, se necessário
    

    // Renderizar a página novamente com os dados atualizados
    res.render('index.ejs', dadosuser);
});
var countnewspost=0;
app.post('/newpost', (req, res) => {
  countnewspost=countnewspost+1;
  // O corpo da solicitação contém os dados enviados pelo AJAX
  if (countnewspost==1){
    var newpost = req.body;
  } else if(countnewspost>1){
    var newpost = {
      ...req.session.posts,
      ...req.body
    };
  };
  
  // Aqui você pode fazer o que for necessário com os dados do POST
  
  
  const dadosCompletos = {
    ...req.session.userinfo,
    ...req.session.edits,
    ...newpost
  };
  // Responder ao cliente, se necessário
  console.log('Dados recebidos via POST POSTAGEM:', dadosCompletos);
  req.session.posts = newpost;
  console.log('Novo req.session.posts agora é', req.session.posts);
  console.log('contador newpost', countnewspost);
  // Renderizar a página novamente com os dados atualizados
  res.render('index.ejs', dadosCompletos);
});




var countnewedit=0;
app.post('/editpost', (req, res) => {
  countnewedit=countnewedit+1;
  // O corpo da solicitação contém os dados enviados pelo AJAX
  if (countnewedit==1){
    var newedit = req.body;
  } else if(countnewspost>1){
    var newedit = {
      ...req.session.edits,
      ...req.body
    };
  };
  
  // Aqui você pode fazer o que for necessário com os dados do POST
  
  
  const dadosCompletosedit = {
    ...req.session.userinfo,
    ...req.session.posts,
    ...newedit
  };
  // Responder ao cliente, se necessário
  console.log('Dados recebidos via PATH POSTAGEM:', dadosCompletosedit);
  req.session.edits = newedit;
  console.log('Novo req.session.edits agora é', req.session.edits);
  console.log('contador newpedit', countnewedit);
  // Renderizar a página novamente com os dados atualizados
  res.render('index.ejs', dadosCompletosedit);
});


  

// App listen
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });


