const {Schema, model}=require('mongoose');

const DocenteSchema = Schema({
    nombre:{
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    apellido:{
        type: String,
        required:[true, 'El apellido es obligatorio']
    },
    descripcion:{
        type: String
    },
    img:{
        type: String
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required: true
    },
    area:{
        type: Schema.Types.ObjectId,
        ref:'Area',
        required: true
    },
    estado:{
        type: Boolean,
        default: true
    }

})
DocenteSchema.methods.toJSON = function(){
    const {__v, ...docente}= this.toObject();
    return docente;
}
module.exports = model('Docente', DocenteSchema)