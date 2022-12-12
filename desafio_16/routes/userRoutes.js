import os from 'os'
import passport from "passport";
import { Router } from "express";
import compression from 'compression'
import { logger } from "../utils/log4js.js";
import { isAuth } from '../middleware/isAuth.js'

const router = Router();

function logRequest(req, res, next) {
    logger.info('Petición de recurso', req.url);
    next()
}

router.use(logRequest)

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
    path: process.cwd(),
    cpus: os.cpus().length
}

router.get('/info', (req, res) => { 
    console.log(processData);
    res.render('info', { processData })
})
router.get('/info-compression', compression(), (req, res) => res.render('info', { processData }))

router.get('*', (req, res) => {
    logger.warn('Recurso invalido')
    res.send('Recurso invalido')
})

export default router