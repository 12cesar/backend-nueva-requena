const { response, request } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const Area = require('../models/area');
const areasGet = async(req = request, res= response) =>{
    const {limite=5, desde=0} = req.query;
    const areas = await Area.find({estado:true});
    const total = await Area.countDocuments({estado:true});
    res.json({
        ok:true,
        total,
        areas
    })
}
const areaGet = async(req = params, res= response) =>{
    const {id}= req.params;
    const area = await Area.findById({_id:id});
    res.json({
        ok: true,
        area
    })
}
const areasPost = async(req= request, res= response) =>{
    const {size, tempFilePath} = req.files.file;
    const data = req.body;
    
    if(data.nombre === '' || data.nombre ===''){
        return res.status(400).json({
            ok: false,
            msg: 'El nombre y la descripcion son obligatorios'
        })
    }
    if(size > 1072383)
    {
        return res.status(400).json({
            ok: false,
            msg:'El tamaño del archivo sobrepasa lo estimado'
        })
    }
    data.nombre= data.nombre.toUpperCase(); 
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    data.img = secure_url;
    const area = new Area(data);
    await area.save();
    res.json({
        ok: true,
        area
   })
}
const areasPut = async(req=request, res=response) =>{
    const {id} = req.params;
    const data = req.body;
    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    const area = await Area.findByIdAndUpdate(id,data, {new:true})
    res.json({
        ok: true,
        area
    })
}
const areasDelete = async (req = request, res = response) => {
    const {id} = req.params;
    modelo = await Area.findById(id)
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const nombreArr = modelo.img.split('/');
        const nombre= nombreArr[nombreArr.length-1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }
    const areas= await Area.findByIdAndRemove(id);
    res.json({
        ok: true,
        areas
    })
}
module.exports = {
    areasGet,
    areaGet,
    areasPost,
    areasPut,
    areasDelete
}