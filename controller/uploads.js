const { response, request } = require("express")
const Usuario = require('./../models/usuario');
const Area = require('./../models/area');
const Docente = require('./../models/docente');
const Historia = require('./../models/historia');
const Categoria = require('./../models/categoria');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const mostrarDasboard= async(req=request, res=response)=>{
    const usuario = await Usuario.countDocuments();
    const area = await Area.countDocuments();
    const noticia = await Noticia.countDocuments();
    const docente = await Docente.countDocuments();
    const categoria = await Categoria.countDocuments();
    res.json({
        usuario,
        area,
        noticia,
        docente,
        categoria
    })
}
const actualizarImagen =async(req = request, res= response)=>{
    const {id, coleccion} = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo =  await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:`No existe un usuario con el id: ${id}`
                });
            }
            break;
        case 'docentes':
            modelo =  await Docente.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:`No existe un docente con el id: ${id}`
                });
            }
            break;
        case 'historias':
            modelo =  await Historia.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:`No existe un noticia con el id: ${id}`
                });
            }
            break;
        case 'areas':
            modelo =  await Area.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg:`No existe un area con el id: ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})
            
    }
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const nombreArr = modelo.img.split('/');
        const nombre= nombreArr[nombreArr.length-1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }
    const {tempFilePath} = req.files.file;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;
    await modelo.save();
    res.json({
        ok: true,
        modelo
    })
}


module.exports ={
    actualizarImagen,
    mostrarDasboard
}