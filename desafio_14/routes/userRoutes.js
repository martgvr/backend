import passport from "passport";
import { Router } from "express";
import { isAuth } from '../middleware/isAuth.js'

const router = Router();

router.get('/', isAuth, (req, res) => res.redirect('/data'))
router.get('/register', (req, res) => res.render('register'))

router.post('/register', passport.authenticate('register', {
    failureRedirect: '/regerror',
    successRedirect: '/data'
}))

router.post('/login', passport.authenticate('login', {
    failureRedirect: '/logerror',
    successRedirect: '/data'
}))

router.get('/logerror', (req, res) => res.render('error', { text: 'Usuario o contraseña incorrectos.', type: 'logerror' }))
router.get('/regerror', (req, res) => res.render('error', { text: 'Este usuario ya se encuentra registrado.', type: 'regerror' }))

router.get('/data', isAuth, (req, res) => res.render('data', { username: req.user.username }))

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/')
    })
})

const processData = {
    args: process.argv.slice(2),
    os: process.platform,
    nodeVersion: process.versions.node,
    rss: process.memoryUsage.rss(),
    execPath: process.execPath,
    pid: process.pid,
    path: process.cwd()
}

router.get('/info', (req, res) => res.render('info', { processData }))

export default router