const { response, request } = require("express");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const Noticia = require("../models/noticia");
const Usuario = require("../models/usuario");
const { ObjectId } = require('mongoose').Types;
const noticiasGet = async (req = request, res = response) => {
  const { limite = 10, desde = 0 } = req.query;
  const noticias = await Noticia.find({ estado: true });
  const total = await Noticia.countDocuments({ estado: true });
  res.json({
    ok: true,
    total,
    noticias,
  });
};
const noticiaGet = async (req = request, res = response) => {
  const { id } = req.params;
  const noticia = await Noticia.findById(id);
  res.json({
    ok: true,
    noticia,
  });
};
const noticiasPost = async (req = request, res = response) => {

  const { tipo, video,  ...data } = req.body;
  if (tipo === "1") {
    const { size, tempFilePath } = req.files.file;
    if (size > 1072123) {
      return res.status(400).json({
        ok: false,
        msg: "El tamaño del archivo sobrepasa lo estimado",
      });
    }
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    data.titulo = data.titulo.toUpperCase();
    data.img = secure_url;
    data.tipo= tipo;
    const noticias = new Noticia(data);
    noticias.save();
    return res.json({
      ok: true,
      noticias
    });
  } else if (tipo === "2") {
    data.titulo = data.titulo.toUpperCase();
    data.img = video;
    data.tipo= tipo;
    data.img = data.img.replace(/\"/g,'');
    const noticias = new Noticia(data);
    noticias.save();
    return res.json({
      ok: true,
      noticias
    });
  }

};
const noticiasPut = async (req = request, res = response) => {
  const { id } = req.params;
  const data = req.body;
  if (data.titulo) {
    data.titulo = data.titulo.toUpperCase();
  }
  const noticias = await Noticia.findByIdAndUpdate(id, data, { new: true })
  res.json({
    ok: true,
    noticias
  });
};
const noticiasDelete = async (req = request, res = response) => {
  const { id } = req.params;
  modelo = await Noticia.findById(id)
  if (modelo.img) {
    // Hay que borrar la imagen del servidor
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split('.');
    cloudinary.uploader.destroy(public_id);
  }
  const noticias = await Noticia.findByIdAndRemove(id);
  res.json({
    ok: true,
    noticias,
  });
};

module.exports = {
  noticiasGet,
  noticiaGet,
  noticiasPost,
  noticiasPut,
  noticiasDelete,
};
