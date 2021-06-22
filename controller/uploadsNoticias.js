const { request, response } = require("express");
const Noticia = require("./../models/noticia");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
actualizarImagenNoticias = async (req = request, res = response) => {
  const { id, coleccion } = req.params;
  const { tipos, ...data } = req.body;
  const noticia = await Noticia.findById(id);
  if (noticia.tipo === "1") {
    if (tipos === "1") {
      if (noticia.img) {
        // Hay que borrar la imagen del servidor
        const nombreArr = noticia.img.split("/");
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split(".");
        cloudinary.uploader.destroy(public_id);
      }
      const { tempFilePath } = req.files.file;
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
      noticia.img = secure_url;
      noticia.tipo = tipos;
      await noticia.save();
      return res.json({
        noticia,
      });
    } else {
      noticia.img = data.video;
      noticia.tipo = tipos;
      noticia.img = noticia.img.replace(/\"/g,'');
      await noticia.save();
      return res.json({
        noticia,
      });
    }
  }
  else if (noticia.tipo === "2") {
      if (tipos ==="2") {
        noticia.tipo = tipos;
        noticia.img = data.video;
        noticia.img = noticia.img.replace(/\"/g,'');
        await noticia.save();
        return res.json({
          noticia
        });
      }else{
          const { tempFilePath } = req.files.file;
          const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
          noticia.img = secure_url;
          noticia.tipo = tipos;
          await noticia.save();
          return res.json({
            noticia,
          });
      }
  }
};
module.exports = {
  actualizarImagenNoticias,
};
