var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  nome: String,
  descricao: String,
  avaliacao: String
});
module.exports = mongoose.model('Movies', MovieSchema);
