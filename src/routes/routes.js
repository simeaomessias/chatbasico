// Express
import express from 'express'
const router = express.Router();

// Home
router.get('/', (req, res) => {
    res.render('index', {layout: 'mainHome'})
})
router.post('/', (req, res) => {
    return
})


// Chat
router.get('/chat', (req, res) => {
    return
})

export default router