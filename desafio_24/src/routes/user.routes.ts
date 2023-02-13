import { Router } from 'oak'
import { getUsersController, getUserByIDController, createUserController } from '@controllers/users.controller.ts'

const router = new Router({ prefix: '/users' })

router.get('/', getUsersController)
router.get('/:id', getUserByIDController)
router.post('/', createUserController)
router.get('/prueba', getUsersController)

export default router