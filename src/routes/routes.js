// Express
import express from 'express'
const router = express.Router();

// Home
router.get('/', (req, res) => {
    return res.render('index', {layout: 'mainHome'})
})
router.post('/', (req, res) => {
    return res.redirect('/chat')
})

// Chat
router.get('/chat', (req, res) => {
    return res.render('chat', {layout: 'mainChat'})
})

export default router