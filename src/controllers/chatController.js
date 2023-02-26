import session from 'express-session'

const index = (req, res) => {
    // Verificação da existência de sessão com usuário
    if (!req.session.usuario) {
        req.session.save( () => {
            return res.redirect('/')            
        })
        return 
    }
    // Verificação se é o primeiro acesso ou não (página atualizada ou link copiado em outra aba)
    if (req.session.primeiroAcesso === "1") {
        let temp = req.session.primeiroAcesso
        req.session.primeiroAcesso = "0"
        req.session.save( () => {
            return res.render('chat', {
                layout: 'mainChat',
                usuario: req.session.usuario,
                primeiroAcesso: temp                
            })
        })
        return
    }
    // Tela de bate-papo (página atualizada ou link copiado em outra aba)
    req.flash('msgSucesso', "A aba inicial foi atualizada ou o link do chat foi copiado em um novo local. Você continua na sala, mas as conversas anteriores foram perdidas.")
    req.session.save( () => {
        return res.render('chat', {
            layout: 'mainChat',
            usuario: req.session.usuario,
            primeiroAcesso: req.session.primeiroAcesso
        })
    })
}

const sairSala = (req, res) => {
    delete req.session.usuario
    req.session.save( () => {
        req.session.destroy();
        return res.redirect('/')
    }) 
}

export default {
    index,
    sairSala
}




