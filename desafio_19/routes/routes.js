import express from 'express'

const router = express.Router()

// ROUTES
router.get('/', (req, res) => {
    res.send('hola')
})

export default router