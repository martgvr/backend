const logout = async (req,res) => req.logout(() => res.redirect('/'))
const renderRegister = async (req,res) => res.render('register')
const renderProfile = async (req,res) => res.render('profile', { data: req.user })
const renderLoginError = async (req,res) => res.render('error', { text: 'Usuario o contraseña incorrectos.', type: 'logerror' })
const renderRegisterError = async (req,res) => res.render('error', { text: 'Este usuario ya se encuentra registrado.', type: 'regerror' })

export default { renderRegister, renderLoginError, renderRegisterError, renderProfile, logout }