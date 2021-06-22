const { response, request } = require("express")

const validarArchivoSubir = (req=request,res=response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).send({ok: false, msg:'No hay archivos que subir'});
    }
    
    next();
}

module.exports={
    validarArchivoSubir
}