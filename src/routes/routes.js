// Express
import express from 'express'
const router = express.Router();

// Controllers
import homeController from '../controllers/homeController.js'
import chatController from '../controllers/chatController.js'

// Home - Tela inicial + Verificação de sala
router.get('/', homeController.index)
router.post('/', homeController.verificarSala)

// Chat
router.get('/chat', chatController.index)
router.get('/sair', chatController.sairSala)

export default router