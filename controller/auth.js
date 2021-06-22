require("dotenv").config();
const { response } = require("express");
const bcrypjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const login = async (req, res = response) => {
  const { usuario, password } = req.body;
  try {
    // Verificar si el email existe
    const data = await Usuario.findOne({ usuario });
    if (!data) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }
    // Si el usuario esta activo
    if (!data.estado) {
      return res.status(400).json({
        msg: "Usuario deshabilitado - comunicarse con el administrador",
      });
    }
    // Verficar la contraseña
    if (password !== data.password) {
      return res.status(400).json({
        msg: "Password no es correcto",
      });
    }
    if (!data.img) {
      data.img = `${process.env.IMG_LOGIN}usuario-default.png`;
    }
    // Generar el GWT
    console.log(data.id);
    const token = await generarJWT(data.id, data.usuario, data.img);

    res.json({
      msg: "Login ok",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
      error,
    });
  }
};

module.exports = {
  login,
};
