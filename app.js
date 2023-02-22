// Express
import express from 'express'
const app = express()

// Pasta "public"
app.use(express.static('public'))

// Express.json() e Express.urlencoded()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Dotenv (loads environment variables)
import dotenv from 'dotenv'
dotenv.config()

// Express-handlebars
import { engine } from 'express-handlebars';
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Express-session
import session from 'express-session'
app.use(session({
    secret: 'qualquerCoisa',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*2, // 2 minutos (tempo máximo de inatividade no chat)
        httpOnly: true
    }
}))

// Connect-flash
import flash from 'connect-flash'
app.use(flash())

// Middlewares
import middleware from './src/middlewares/middleware.js'
app.use(middleware.global)

// Routes
import routes from './src/routes/routes.js'
app.use(routes)

// Inicializações
global.listaUsuarios = []
global.capacidadeSala = 6

// Http
import http from 'http'
const server = http.createServer(app)

// Socket.io
import {Server} from 'socket.io'
const io = new Server(server)
io.on('connection', (socket) => {

    console.log(`Usuário conectado: ${socket.id}`)

    // Recebimento de novo usuario e distribuição para os sockets
    socket.on('novo-usuario', (novoUsuario) => {
        io.emit('usuario-entrou', novoUsuario)
        io.emit('atualiza-usuarios', listaUsuarios)
    })

    // Recebimento de nova mensagem e distribuição para os sockets
    socket.on('nova-mensagem', (usuario, novaMensagem) => {
        io.emit('incluir-mensagem', usuario, novaMensagem)
    })

    /*
    socket.on('disconnect', () => {
        console.log(`Usuário desconectado: ${socket.id}`)
    })
    */

})

// Servidor
const PORT = process.env.PORT || 8081
server.listen(PORT, () => {
    console.log(`SERVIDOR: Ativo na porta ${PORT}`)
})
