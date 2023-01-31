export default class UsersController {
    renderRegisterError = async (req,res) => res.render('error', { text: 'Este usuario ya se encuentra registrado.', type: 'regerror' })
    renderLoginError = async (req,res) => res.render('error', { text: 'Usuario o contraseña incorrectos.', type: 'logerror' })
    renderRegister = async (req,res) => res.render('register')
    renderProfile = async (req,res) => res.render('profile', { data: req.user })
    logout = async (req,res) => req.logout(() => res.redirect('/'))
}