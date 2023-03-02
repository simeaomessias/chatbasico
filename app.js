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
import mongoose, { isObjectIdOrHexString } from 'mongoose'
mongoose.set('strictQuery', false);
const mongoUri = process.env.MONGOURI
mongoose.Promise = global.Promise
mongoose.connect(mongoUri).then( () => {
    console.log("BANCO DE DADOS: Conectado.")
    app.emit("connectedDatabase")
}).catch( (erro) => {
    console.log(`BANCO DE DADOS: A conexão com o MongoDB não foi realizada! ERRO: ${erro}`)
})

// Importação - Sessões de usuários
import SessionSchema from './src/models/Session.js'
const Session = mongoose.model('sessions', SessionSchema, 'sessions');

// Connect-mongo
var store = MongoStore.create({
    mongoUrl: mongoUri
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
    store: store,
    cookie: {
        maxAge: 10*(60*1000), // 10 minutos (tempo máximo dentro do chat)
        httpOnly: true
    }
}))

// Http
import http from 'http'
const server = http.createServer(app)

// Socket.io
import {Server} from 'socket.io'
const io = new Server(server)
// Eventos
io.on('connection', (socket) => {

    // usuario-entrada -->> usuario-entrou
    socket.on('usuario-entrada', (usuario) => {
        io.emit('usuario-entrou', usuario)
    })
    // usuario-saida -->> usuario-saiu
    socket.on('usuario-saida', (usuario) => {
        io.emit('usuario-saiu', usuario)
    })
    // nova-mensagem -->> incluir-mensagem
    socket.on('nova-mensagem', async (usuario, sid, novaMensagem) => {
        // Lista de todas as sessões ativas
        let listaSessoes = await Session.find().lean()
        let listaSIDs = []
        listaSessoes.forEach( (sessao) => {
            let sessaoJSON = JSON.parse(sessao.session)
            if (sessaoJSON.usuario) {
                listaSIDs.push(sessaoJSON.sid)
            }
        })
        // Verificação se a sessão remetente está ativa
        if (listaSIDs.includes(sid)) {
            // Envia a mensagem pora os outros usuários
            io.emit('incluir-mensagem', usuario, sid, novaMensagem, listaSIDs)
        } else {
            console.log("Servidor - Entrei no if - Não vou mandar a mensagem digitada!")
        }
    })
})

// Middlewares
import middleware from './src/middlewares/middleware.js'
app.use(middleware.global)

// Routes
import routes from './src/routes/routes.js'
app.use(routes)

// Inicializações
global.capacidadeSala = 5

// Servidor
const PORT = process.env.PORT || 8081
app.on('connectedDatabase', () => {
    server.listen(PORT, () => {
        console.log(`SERVIDOR: Ativo na porta ${PORT}`)
    })  
})