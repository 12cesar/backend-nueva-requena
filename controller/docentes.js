const { response, request } = require("express");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const Docente = require("../models/docente");
const Categoria = require("../models/categoria");
const Area = require("../models/area");
const {ObjectId} =require('mongoose').Types;
const docentesGet = async (req = request, res = response) => {
  const { limite = 10, desde = 0 } = req.query;

  const docentes = await Docente.find({ estado: true })
    .populate("categoria", "nombre")
    .populate("area", "nombre");
  const total = await Docente.countDocuments({ estado: true });
  res.json({
    ok: true,
    total,
    docentes,
  });
};
const docenteGet = async (req = request, res = response) => {
  const { id } = req.params;
  const docente = await Docente.findById(id)
    .populate("categoria", "nombre")
    .populate("area", "nombre");
  res.json({
    ok: true,
    docente,
  });
};
const docentesPost = async (req = request, res = response) => {
  const { size, tempFilePath } = req.files.file;
  const { nombre, apellido, descripcion, categoria, area } = req.body;
  if (size > 102265) {
    return res.status(400).json({
      ok: false,
      msg: "El tamaño del archivo sobrepasa lo estimado",
    });
  }
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  const data = {
    nombre: nombre.toUpperCase(),
    apellido: apellido.toUpperCase(),
    descripcion,
    categoria,
    area,
    img: secure_url,
  };
  const docentes = new Docente(data);
  await docentes.save();
  res.json({
    ok: true,
    docentes,
  });
};
const docentesPut = async (req = request, res = response) => {
  const { id } = req.params;
  const data = req.body;
  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }
  if (data.apellido) {
    data.apellido = data.apellido.toUpperCase();
  }
  if (data.categoria) {
    const esMongoID = ObjectId.isValid(data.categoria);
    if (esMongoID) {
        const categorias = await Categoria.findById(data.categoria);
        if (!categorias) {
            return res.status(401).json({
                ok: false,
                msg:'La categoria no existe en la base de datos'
            })
        }
    }else{
    return res.status(401).json({
        ok: false,
        msg:'La categoria no es valida'
    })}
  }
  if (data.area) {
    const esMongoID = ObjectId.isValid(data.area);
    if (esMongoID) {
        const area = await Area.findById(data.area);
        if (!area) {
            return res.status(401).json({
                ok: false,
                msg:'El area no existe en la base de datos'
            })
        }
    }else{
    return res.status(401).json({
        ok: false,
        msg:'El area no es valida'
    })}
  }
  const docentes = await Docente.findByIdAndUpdate(id, data, { new: true });
  res.json({
    ok: true,
    docentes
  });
};
const docentesDelete = async (req = request, res = response) => {
  const { id } = req.params;
  modelo = await Docente.findById(id)
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const nombreArr = modelo.img.split('/');
        const nombre= nombreArr[nombreArr.length-1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }
  const docentes = await Docente.findByIdAndRemove(id);
  res.json({
    ok: true,
    docentes,
  });
};
module.exports = {
  docentesGet,
  docenteGet,
  docentesPost,
  docentesPut,
  docentesDelete,
};
