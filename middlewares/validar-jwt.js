const jwt = require('jsonwebtoken');
const {response, request} = require('express');
const Usuario = require('../models/usuario');
const validarJWT =async (req= request, res = response, next)=>{ 
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {uid, usuario, img} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario

        const data = await Usuario.findOne({_id: uid});

        if (!data) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })
        }
        
        // Verificar si el uid tiene estado en tru
        if (!data.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado : false'
            })
        }
        req.usuarioToken = data;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
    
}

module.exports = {
    validarJWT  
}