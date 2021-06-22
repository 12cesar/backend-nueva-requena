const { Schema, model } = require("mongoose");

const NoticiaSchema = new Schema({
    titulo:{
        type: String,
        required:[true, 'El titulo es obligatorio']
    },
    descripcion:{
        type: String,
        required:[true, 'La descripcion es obligatoria']
    },
    img:{
        type: String
    },
    tipo:{
        type: String
    },
    fecha:{
        type: Date,
        default: Date.now()
    },
    estado:{
        type: Boolean,
        default: true
    }
});
NoticiaSchema.methods.toJSON = function(){
    const {__v, ...noticia}= this.toObject();
    return noticia;
}
module.exports = model('Noticia', NoticiaSchema);