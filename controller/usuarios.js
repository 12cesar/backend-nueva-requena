const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 10, desde = 0 } = req.query;
  const usuario = await Usuario.find({ estado: true });
  const total = await Usuario.countDocuments({estado:true});
  res.json({
    ok: true,
    total,
    usuario,
  });
};
const usuarioGet = async (req = request, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);
  res.json({
    ok: true,
    usuario,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, usuario, password } = req.body;
  
  const data = new Usuario({ nombre, usuario, password });
  // Encriptar la contraseña
  /* const salt = bcryptjs.genSaltSync();
  data.password = bcryptjs.hashSync(password, salt); */
  
  // Guardar en la base de datos
  await data.save();
  res.json({
    ok: true,
    data,
  });
};
const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;
  // Validar contra base de datos
  /* if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  } */
  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
  res.json({
    ok: true,
    usuario,
  });
};
const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;
  modelo = await Usuario.findById(id)
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const nombreArr = modelo.img.split('/');
        const nombre= nombreArr[nombreArr.length-1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }
  const usuario = await Usuario.findByIdAndRemove(id);
  res.json({
    ok: true,
    usuario,
  });
};
module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuarioGet
};
