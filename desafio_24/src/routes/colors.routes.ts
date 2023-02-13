import { Router } from 'oak'
import { getUsersController, createUserController } from '@controllers/colors.controller.ts'

const router = new Router({ prefix: '/colors' })

router.get('/', getUsersController)
router.post('/', createUserController)

export default router