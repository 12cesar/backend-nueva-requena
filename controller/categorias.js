const { response, request } = require("express");
const Categoria = require('../models/categoria');
const categoriasGet = async(req=request, res = response) => {
    const {pageSize=10, desde=0, page=1} = req.query;
    Number(page);
    Number(pageSize);
    const categorias = await Categoria.find()
    
    const collectionSize = await Categoria.countDocuments({estado: true}); 
    pages = Math.ceil(collectionSize/pageSize);
    res.json({
        ok: true,
        page,
        pageSize,
        pages,
        collectionSize,
        categorias
        /* 
        categorias */
    })
}
const categoriaGet = async(req, res = response) =>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id);
    res.json({
        ok: true,
        categoria
    })
}
const categoriaPost = async(req, res= response) => {
    const data = req.body;
    const categorias = new Categoria(data);
    categorias.nombre = categorias.nombre.toUpperCase();
    await categorias.save();
    res.json({
        ok: true,
        categorias
    })
}
const categoriasPut = async(req, res = response) =>{
    const {id} = req.params;
    const data = req.body;
    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    const categorias = await Categoria.findByIdAndUpdate(id, data, {new:true});
    res.json({
        ok: true,
        categorias
    })
}
const categoriasDelete = async(req, res = response) =>{
    const {id} = req.params;
    modelo = await Categoria.findById(id)
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const nombreArr = modelo.img.split('/');
        const nombre= nombreArr[nombreArr.length-1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }
    const categorias = await Categoria.findByIdAndRemove(id);
    res.json({
        ok: true,
        categorias
    })
}


module.exports = {
    categoriasGet,
    categoriaGet,
    categoriaPost,
    categoriasPut,
    categoriasDelete
}