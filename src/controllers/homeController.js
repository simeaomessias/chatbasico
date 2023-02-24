// Sessão (MongoDB)
import session from 'express-session'
import mongoose from 'mongoose';

import SessionSchema from '../models/Session.js'
const Session = mongoose.model('sessions', SessionSchema, 'sessions');

// Home - Tela inicial
const index = async (req, res) => {

    // Verificação do número de sessões ativas (com usuário já cadastrado)
    let listaSessoes = await Session.find().lean()
    let totSessoesAtivas = 0
    listaSessoes.forEach( (item) => {
        let sessionJSON = JSON.parse(item.session)
        if (sessionJSON.usuario) {
            totSessoesAtivas++
        }
    })
    console.log(`Sessões ativasA; ${totSessoesAtivas}`)


    // Verificaçao se existe sessão ativa
    if (req.session.usuario) {
        req.flash('msgSucesso', "Você já está na sala de bate-papo. Volte para a aba de conversas. Se fechou, aguarde 2 minutos de inatividade para poder entrar de novo.")
        req.session.usuarioNovo = false
        req.session.save( () => {
            return res.redirect('/chat')
        })
        return
    }
    return res.render('index', {layout: 'mainHome'})
}

// Home - Verifica de sala
const verificarSala = async (req, res) => {

    // Inicialização do usuário na sessão
    req.session.usuario = null
    req.session.usuarioNovo = false
    req.session.capacidadeSala = capacidadeSala

    // Verificação se a sala está cheia
    // Número de usuários e sessões não expiradas
    const salaCheia = listaUsuarios.length >= capacidadeSala
    if (salaCheia) {
        req.flash('msgErro', "Sala lotada!")
        req.session.save( () => {
            return res.redirect('back')
        })
        return
    }

    // Verificação da disponibilidade do nome de usuário
    let usuarioIndisponivel = false
    for (let i=0; i<listaUsuarios.length; i++) {
        if (listaUsuarios[i].usuario === req.body.usuario) {
            usuarioIndisponivel = true
            break
        }
    }
    if (usuarioIndisponivel) {
        req.flash('msgErro', "Nome de usuário indisponível.")
        req.session.save( () => {
            return res.redirect('back')
        })
        return
    }

    // Usuario passou das verificações
    // Atualização da lista de usuários e da sessão criada para ele
    listaUsuarios.push({
     usuario: req.body.usuario,
     idSessao: req.session.id
    })
    listaUsuarios.sort( function(a,b) {
        return a.usuario < b.usuario ? -1 : a.usuario > b.usuario ? 1 : 0;
    });

    req.session.usuario = req.body.usuario
    req.session.usuarioNovo = true
    req.session.save( () => {
        res.redirect('/chat')
    })
    
}

export default {
    index,
    verificarSala
}