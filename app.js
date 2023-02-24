// Express
import express from 'express'
const app = express()

// Pasta "public"
app.use(express.static('public'))

// Express.json() e Express.urlencoded()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Express-handlebars
import { engine } from 'express-handlebars';
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Connect-flash
import flash from 'connect-flash'
app.use(flash())

// Dotenv
import dotenv from 'dotenv'
dotenv.config()

// Cookie
import cookieParser from 'cookie-parser'
const cookie = cookieParser(process.env.SECRET)
app.use(cookie)

// Mongoose
import mongoose from 'mongoose'
mongoose.set('strictQuery', false);
const mongoUri = process.env.MONGOURI
mongoose.Promise = global.Promise
mongoose.connect(mongoUri).then( () => {
    console.log("BANCO DE DADOS: Conectado.")
    app.emit("connectedDatabase")
}).catch( (erro) => {
    console.log(`BANCO DE DADOS: A conexão com o MongoDB não foi realizada! ERRO: ${erro}`)
})

// Express-session
import session from 'express-session'
import MongoStore from 'connect-mongo'
// var store = new session.MemoryStore()
app.use(session({
    name: process.env.KEY,
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: mongoUri
    }),
    cookie: {
        maxAge: 1000*60*2, // 2 minutos (tempo máximo de inatividade no chat)
        httpOnly: true
    }
}))

// Http
import http from 'http'
const server = http.createServer(app)

// Socket.io
import {Server} from 'socket.io'
const io = new Server(server)

// Compartilhando a sessão válida do Express no Socket.io
/*
io.use( (socket, next) => {
    var data = socket.request
    cookie(data, {}, (err) => {
        var sessionID = data.signedCookies[process.env.KEY]
        store.get(sessionID, (err, session) => {
            if (err || !session) {
                return next(new Error('Acesso negado!'))
            } else {
                socket.handshake.session = session
                return next()
            }
        })

    })
})
*/

// Iniciando uma conexão com o Socket.io
/*
io.sockets.on('connection', (client) => {
    // Recuperando uma sessão do Express
    var session = client.handshake.session
    client.on('toServer', (msg) => {
        // msg = `session.nome: ${session.nome}`
        msg = "TESTE"
        client.emit('toClient', msg)
        client.broadcast.emit('toClient', msg)
    })
})
*/

/*
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

    socket.on('disconnect', () => {
        console.log(`Usuário desconectado: ${socket.id}`)
    })

})
*/

/*
            var connectionsLimit = 1

            io.on('connection', function (socket) {

            if (io.engine.clientsCount > connectionsLimit) {
                socket.emit('err', { message: 'reach the limit of connections' })
                socket.disconnect()
                console.log('Disconnected...')
                return
            }

            })
*/

/*
            io.on('connection', (socket) => {
                console.log("Nesse momento temos " + 
                socket.server.engine.clientsCount + " conexões ativas.");
            });
*/

// Middlewares
import middleware from './src/middlewares/middleware.js'
app.use(middleware.global)

// Routes
import routes from './src/routes/routes.js'
app.use(routes)

// Inicializações
global.listaUsuarios = []
global.capacidadeSala = 5

// Servidor
const PORT = process.env.PORT || 8081
app.on('connectedDatabase', () => {
    server.listen(PORT, () => {
        console.log(`SERVIDOR: Ativo na porta ${PORT}`)
    })  
})