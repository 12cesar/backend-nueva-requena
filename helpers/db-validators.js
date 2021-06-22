const Role = require("../models/role");
const Usuario = require("../models/usuario");
const Area = require("../models/area");
const Categoria = require("../models/categoria");
const Docente = require("../models/docente");
const Noticia = require("../models/noticia");
const Mensaje = require("../models/mensaje");
const Historia = require("../models/historia");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};
const esIDValido = async (id) => {
  const existeID = await Usuario.findById(id);
  if (!existeID) {
    throw new Error(`El id del usuario no existe en la base de datos`);
  }
};
const esNombreValido = async (nombre) => {
  const existeNombre = await Usuario.findOne({ nombre });
  if (existeNombre) {
    throw new Error(
      `El administrador: ${nombre} ya existe en la base de datos`
    );
  }
};
const esUsuarioValido = async (usuario) => {
  const existeUsuario = await Usuario.findOne({ usuario });
  if (existeUsuario) {
    throw new Error(`El usuario: ${usuario} ya existe en la base de datos`);
  }
};
const esAreaValido = async (name) => {
  const nombre = name.toUpperCase();
  const existeNombre = await Area.findOne({ nombre });
  if (existeNombre) {
    throw new Error(`El area: ${nombre} ya existe en la base de datos`);
  }
};
const esIdAreaValido = async (id) => {
  const existeID = await Area.findById(id);
  if (!existeID) {
    throw new Error(`El id del area no existe en la base de datos`);
  }
};
const esCategoriaValida = async (name) => {
  const nombre = name.toUpperCase();
  const existeNombre = await Categoria.findOne({ nombre });
  if (existeNombre) {
    throw new Error(`La categoria: ${nombre} ya existe en la base de datos`);
  }
};
const esIdCategoriaValida = async (id) => {
  const existeID = await Categoria.findById(id);
  if (!existeID) {
    throw new Error(`El id de la categoria no existe en la base de datos`);
  }
};
const esNombreDocenteValido = async (name) => {
  const nombre = name.toUpperCase();
  const existeNombre = await Docente.findOne({ nombre });
  if (existeNombre) {
    throw new Error(`El docente: ${nombre} ya existe en la base de datos`);
  }
};
const esIdDocenteValido = async (id) => {
  const existeID = await Docente.findById(id);
  if (!existeID) {
    throw new Error(`El id del docente no existe en la base de datos`);
  }
};
const esTituloNoticiaValido = async (name) => {
  const titulo = name.toUpperCase();
  const existeNombre = await Noticia.findOne({ titulo });
  if (existeNombre) {
    throw new Error(`La noticia: ${titulo} ya existe en la base de datos`);
  }
};
const esIdNoticiaValido = async(id) => {
  const existeID = await Noticia.findById(id);
  if (!existeID) {
    throw new Error(`El id de la noticia no existe en la base de datos`);
  }
};
const coleccionesPermitidas = (coleccion='', colecciones=[]) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
      throw new Error(`La coleccion ${coleccion} no es permitida`);
  }
  return true;
}
const esIdMensajeValido = async(id) => {
  const existeID = await Mensaje.findById(id);
  if (!existeID) {
    throw new Error(`El id del mensaje no existe en la base de datos`);
  }
};
const esIdHistorioValido = async(id) => {
  const existeID = await Historia.findById(id);
  if (!existeID) {
    throw new Error(`El id de la historia no existe en la base de datos`);
  }
};
module.exports = {
  esRoleValido,
  esUsuarioValido,
  esNombreValido,
  esIDValido,
  esAreaValido,
  esIdAreaValido,
  esCategoriaValida,
  esIdCategoriaValida,
  esNombreDocenteValido,
  esIdDocenteValido,
  esTituloNoticiaValido,
  esIdNoticiaValido,
  coleccionesPermitidas,
  esIdMensajeValido,
  esIdHistorioValido
};
