var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
  nome: String,
  exibir: String
});
module.exports = mongoose.model('Usuario', UsuarioSchema);
