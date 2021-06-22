const { Schema, model } = require("mongoose");

const AreaSchema = Schema({
    nombre:{
        type: String,
        required:[true, 'El nombre del area es requerido']
    },
    descripcion:{
        type: String,
        required:[true, 'La descripcion es requerida']
    },
    img:{
        type: String,
    },
    estado:{
        type: Boolean,
        default:true, 
    }
});
AreaSchema.methods.toJSON = function(){
    const {__v, ...area}= this.toObject();
    return area;
}
module.exports = model('Area', AreaSchema);