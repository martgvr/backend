import { Router } from 'oak'
import userRoutes from '@routes/user.routes.ts'

const router = new Router({ prefix: '/api' })

router.use(userRoutes.routes())

export default router