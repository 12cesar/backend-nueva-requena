const { request, response } = require("express");
const Mensaje = require('./../models/mensaje');

const mensajeGet=async(req=request, res= response)=>{
    const mensaje = await Mensaje.find();
    const total = await Mensaje.countDocuments();
    res.json({
        ok:true,
        total,
        mensaje
    })
}
const mensajePost=async(req=request, res= response)=>{
    const data = req.body;
    const mensaje = new Mensaje(data);
    await mensaje.save();
    res.json({
        ok:true,
        mensaje
    })
}
const mensajeDelete= async(req=request, res= response)=>{
    const {id} = req.params;
    const mensaje = await Mensaje.findByIdAndRemove(id, {new: true});
    res.json({
        ok:true,
        mensaje
    })
}



module.exports ={
    mensajeGet,
    mensajePost,
    mensajeDelete
}