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

// Servidor
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`SERVIDOR: Ativo na porta ${PORT}`)
})
