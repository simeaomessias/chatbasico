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

    // Recebimento de novo apelido e distribuição para os sockets
    socket.on('novo-usuario', (txt) => {

        if (txt && typeof txt !== undefined && txt !== null) {

            // Verificação se o apelido já existe na sala
            let achou = false
            for (let i=0; i<listaUsuarios.length; i++) {
                if (listaUsuarios[i].nome === txt) {
                    achou = true
                    console.log("O apelido já existe!")
                }
            }

            if (!achou) {
                const usuario = {
                    nome: txt,
                    id: socket.id
                }
                listaUsuarios.push(usuario)
                listaUsuarios.sort( function(a,b) {
                    return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
                });
            }
        }
        io.emit('incluir-usuario', listaUsuarios)
    })

    socket.on('disconnect', () => {
        console.log(`Usuário desconectado: ${socket.id}`)
    })

})

// Servidor
const PORT = process.env.PORT || 8081
server.listen(PORT, () => {
    console.log(`SERVIDOR: Ativo na porta ${PORT}`)
})
