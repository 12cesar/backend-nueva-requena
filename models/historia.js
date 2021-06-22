const { Schema, model } = require("mongoose");

const HistoriaSchema = new Schema({
    titulo:{
        type: String,
        required:[true, 'El titulo es obligatorio']
    },
    mensaje:{
        type: String,
        required:[true, 'El mensaje es obligatorio']
    },
    img:{
        type: String
    }
});
HistoriaSchema.methods.toJSON = function(){
    const {__v, ...historia}= this.toObject();
    return historia;
}

module.exports = model('Historia', HistoriaSchema);