const { response } = require("express")

const esAdminRole =(req , res= response, next) => {
    if (!req.usuarioToken) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        })
    }
    const {rol, nombre} = req.usuarioToken;

    if (rol!=='ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer eso`
        })
    }

    next();
}

const tieneRole = (...roles) => {
    return (req , res= response, next)=>{
        if (!req.usuarioToken) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token'
            })
        }
        if (!roles.includes(req.usuarioToken.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }

}
module.exports = {
    esAdminRole,
    tieneRole
}