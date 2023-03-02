// Sessão (MongoDB)
import session from 'express-session'
import mongoose from 'mongoose';

import SessionSchema from '../models/Session.js'
const Session = mongoose.model('sessions', SessionSchema, 'sessions');

// Home - Tela inicial
const index = async (req, res) => {

    // Redirecionamento para o bate-papo se já existir sessão ativa para o usuário atual
    if (req.session.usuario) {
        req.session.save( () => {
            return res.redirect('/chat')
        })
        return
    }
    // Tela para entrada do nome de usuário
    return res.render('index', {layout: 'mainHome'})
}

// Home - Verifica de sala
const verificarSala = async (req, res) => {

    // Sessões com usuários cadastrados
    let listaSessoes = await Session.find().lean()
    let listaUsuarios = []
    let totSessoesAtivas = 0
    listaSessoes.forEach( (sessao) => {
        let sessaoJSON = JSON.parse(sessao.session)
        if (sessaoJSON.usuario) {
            totSessoesAtivas++
            listaUsuarios.push(sessaoJSON.usuario.toLowerCase().trim())
        }
    })
    // Verificação da lotação atual da sala
    const salaCheia = totSessoesAtivas >= capacidadeSala
    if (salaCheia) {
        req.flash('msgErro', "Sala lotada!")
        req.session.save( () => {
            return res.redirect('back')
        })
        return
    }
    // Verificação da disponibilidade do nome de usuário
    let usuarioIndisponivel = listaUsuarios.includes(req.body.usuario.toLowerCase())
    if (usuarioIndisponivel) {
        req.flash('msgErro', "Nome de usuário indisponível.")
        req.session.save( () => {
            return res.redirect('back')
        })
        return
    }
    // Verificações concluídas
    req.session.usuario = req.body.usuario.toLowerCase()
    req.session.primeiroAcesso = req.body.primeiroAcesso = "1" // 1 - Sim 0 - Não
    req.session.sid = req.sessionID // É o próprio _id do mongodb
    req.session.save( () => {
        res.redirect('/chat')
    })
}

export default {
    index,
    verificarSala
}