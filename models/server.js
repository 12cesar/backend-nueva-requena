const express = require("express");
const cors = require("cors");
const multer = require('multer');
const fileUpload = require("express-fileupload");
const hbs = require("hbs");
const path = require('path');
const { dbConnection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      uploadsNoticias: "/api/uploadsNoticia",
      uploads: "/api/uploads",
      historias: "/api/historias",
      mensaje: "/api/mensaje",
      auth: "/api/auth",
      areas: "/api/areas",
      categorias: "/api/categorias",
      docentes: "/api/docentes",
      noticias: "/api/noticias",
      usuarios: "/api/usuarios",
    };
    // Conectar a base de datos
    this.conectarDB();
    // Middlewares
    this.middlewares();
    // Rutas de mi aplicacion
    this.routes();
  }
  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // Handelbers
    // Handelbars
    
    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
    // Cors
    this.app.use(cors());
    
    // Lectura y parseo del body
    this.app.use(express.json());
    // Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.uploadsNoticias, require("../routes/uploadsNoticia"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
    this.app.use(this.paths.historias, require("../routes/historias"));
    this.app.use(this.paths.mensaje, require("../routes/mensaje"));
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.areas, require("../routes/areas"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.docentes, require("../routes/docentes"));
    this.app.use(this.paths.noticias, require("../routes/noticias"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Escuchando el puerto ${this.port}: http://localhost:${this.port}`
      );
    });
  }
}

module.exports = Server;
