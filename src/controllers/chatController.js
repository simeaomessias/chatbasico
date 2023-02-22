
const index = (req, res) => {
    res.render('chat', {
        layout: 'mainChat',
        usuario: req.session.usuario,
        usuarioNovo: req.session.usuarioNovo
    })
}

export default {
    index
}




