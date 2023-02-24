import session from 'express-session'


const index = async (req, res) => {

    res.render('chat', {
        layout: 'mainChat',
        usuario: req.session.usuario,
        usuarioNovo: req.session.usuarioNovo,
        capacidadeSala: req.session.capacidadeSala
    })
}

export default {
    index
}




