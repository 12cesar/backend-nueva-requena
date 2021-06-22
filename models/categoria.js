const { Schema, model } = require("mongoose");

const CategoriSchema = new Schema({
    nombre:{
        type: String,
        required:[true,'El nombre de la categoria es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true
    }
});
CategoriSchema.methods.toJSON = function(){
    const {__v, ...categoria}= this.toObject();
    return categoria;
}
module.exports = model('Categoria', CategoriSchema)