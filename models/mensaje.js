const { Schema, model } = require("mongoose");


const MensajeSchema= new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String
    },
    mensaje:{
        type: String,
        requerid:[true, 'El mensaje es obligatorio']
    },
    fecha:{
        type: Date,
        default: Date.now()
    }
});

MensajeSchema.methods.toJSON = function(){
    const {__v, ...mensaje}= this.toObject();
    return mensaje;
}

module.exports = model('Mensaje', MensajeSchema);