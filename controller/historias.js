const { request, response } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const Historia = require('../models/historia');
const historiaGet= async(req= request, res= response)=>{
    const historia = await Historia.find();
    const total = await Historia.countDocuments();
    res.json({
        ok:true,
        total,
        historia
    })
}

const historiaPost=async(req= request, res= response)=>{
    const {size, tempFilePath}= req.files.file;
    const data = req.body;
    if (size > 1072383) {
        return res.status(400).json({
            ok: false,
            msg:'El tamaño del archivo sobrepasa lo estimado'
        })
    }
    data.titulo = data.titulo.toUpperCase();
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    data.img = secure_url;
    const historia = new Historia(data);
    await historia.save();
    res.json({
        ok:true,
        historia
    })
}

const historiaPut= async(req= request, res= response)=>{
    const {id}= req.params;
    const data = req.body;
    if (data.titulo) {
        data.titulo = data.titulo.toUpperCase();
    }

    const historia = await Historia.findByIdAndUpdate(id, data, {new:true})
    res.json({
        ok:true,
        historia
    })
}


module.exports = {
    historiaGet,
    historiaPost,
    historiaPut
}



