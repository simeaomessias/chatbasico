// Express
import express from 'express'
const router = express.Router();

// Home
router.get('/', (req, res) => {
    return res.render('index', {layout: 'mainHome'})
})

router.post('/', (req, res) => {
    if (listaUsuarios.length < capacidadeSala) {
        return res.render('chat', {layout: 'mainChat', apelido: req.body.apelido.trim()})
    }
    return res.render('index', {layout: 'mainHome', erro: "A sala está lotada (6 integrantes)"})
    
})

// Chat
router.get('/chat', (req, res) => {

})

export default router