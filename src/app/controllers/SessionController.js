const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('E-mail inexistente, tente novamente.')
      req.flash('error', 'E-mail incorreto, tente novamente.')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('Senha incorreta, tente novamente.')
      req.flash('error', 'Senha incorreta, tente novamente.')
      return res.redirect('/')
    }

    req.session.user = user

    console.log('logado com sucesso')

    return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
