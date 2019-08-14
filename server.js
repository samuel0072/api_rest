//Variaveis a serem utilizadas
const express     = require('express');
const bodyParser  = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app         = express();
var port          = process.env.PORT || 3000;
var router        = express.Router();
var mongoose      = require('mongoose');
var Usuario       = require('./app/models/categories');//Caminho para o módulo do Categories
var Movie         = require('./app/models/movies');//Módulo do movies

//Definições necessaŕias para usar o req.body como meio de armazenar dados para posteriormente enviar no banco de dados.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Método router do express
app.use('/', router);
//Conexão com o banco de dados
mongoose.connect('mongodb://internet:internet@ds159033.mlab.com:59033/interneteweb', { useMongoClient: true,});
//Servidor aberto na variável port
app.listen(port);

router.use(function(req, res, next){
  console.log('somthing is happening...');
  next();
});
//No caminho '/' mostra a mensagem
router.get('/', function(req, res){
  res.json({message: 'funcionando...'});

});
//Definição do localhost:3000/categories
//No caminho /categories executa os blocos abaixo
router.route('/categories')
    //Faz a criação da categoria
  .post(function(req, res){
    var usuario = new Usuario();
    usuario.nome = req.body.nome;
    usuario.exibir = req.body.exibir;

    //Salva acategoria no banco de dados
    usuario.save(function(error){
      if(error){ res.send(error);}

      //Envia como resposta
      res.json({massage: 'Categoria criada!'});
    });

  })
  //retorna todas as categorias salvas no banco de dados ao digitar o caminho localhost:3000/categories
  .get(function(req, res){
    Usuario.find( function(err,usuarios) {
      if(err)
        res.send(err);
      res.json(usuarios);
    });
  });
  //No caminho /categories/:usuario_id faz as ações especificadas pelo id digitado após o /categories
  router.route('/categories/:usuario_id')
  //Procura pela categoria especificada no usuario_id
    .get(function(req, res){
      Usuario.findById(req.params.usuario_id, function(error, usuario){
        if(error)//Mostra o erro caso haja
          res.send(error);
        res.json(usuario);
      });
    })
    //Atualiza pela id especificada no usuario_id
    .put(function(req, res){
        //Procura na coleção
      Usuario.findById( req.params.usuario_id, function(error, usuario){
        if(error)
          res.send(error);
          usuario.nome = req.body.nome;
    	  usuario.exibir = req.body.exibir;
        //Salva as mudanças
        usuario.save(function(error){
          if(error)
            res.send(error)
          res.json({message: 'Categoria atualizada!'});//Mostra caso tudo eesteja bem sucedido
        })
      })
    })
    //Deleta pela id especificada no uduario_id
    .delete(function(req, res){
      Usuario.remove({_id: req.params.usuario_id}, function(error){
        if(error)
          res.send(error);
        res.json({message: 'Categoria deletada!'});
    })
  })

//Definição do localhost:3000/movies
router.route('/movies')//Acessa o caminho /movies
    //Cria um novo movie
  .post(function(req, res){
    var movie      = new Movie();
    //A variável movie recebe tudo o que for digitado nos campos
    movie.nome     = req.body.nome;
    movie.descricao = req.body.descricao;
    movie.avaliacao = req.body.avaliacao;
    //Salva na variável
    movie.save(function(error){
      if(error){ res.send(error);}


      res.json({massage: 'Movie criado!'});
    });

  })
//localhost:3000/movie mostra todas as categories
  .get(function(req, res){
    Movie.find( function(err,usuarios) {
      if(err)
        res.send(err);
      res.json(usuarios);
    });
  });
  //Procura o movie especificado pelo id
  router.route('/movies/:movie_id')
    .get(function(req, res){
      Movie.findById(req.params.movie_id, function(error, movie){
        if(error)
          res.send(error);
        res.json(movie);
      });
    })
    //Atualiza o movie especificado pelo id
    .put(function(req, res){
      Movie.findById( req.params.movie_id, function(error, movie){
        if(error)
          res.send(error);
          movie.nome      = req.body.nome;
          movie.descricao = req.body.descricao;
          movie.avaliacao = req.body.avaliacao;

        movie.save(function(error){
          if(error)
            res.send(error)
          res.json({message: 'Movie atualizado!'});
        })
      })
    })
    //Deleta o movie especificado pelo id
    .delete(function(req, res){
      Movie.remove({_id: req.params.movie_id}, function(error){
        if(error)
          res.send(error);
        res.json({message: 'Movie deletado!'});
    })
  })
