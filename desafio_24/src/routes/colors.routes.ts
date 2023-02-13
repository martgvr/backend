import { Router } from 'oak'
import { getColorsController, saveColorController } from '@controllers/colors.controller.ts'

const router = new Router({ prefix: '/colors' })

router.get('/', getColorsController)
router.post('/', saveColorController)

export default router