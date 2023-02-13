import { Router } from 'oak'
import colorsRoutes from '@routes/colors.routes.ts'

const router = new Router()

router.use(colorsRoutes.routes())

router.get('/', (ctx) => ctx.render("index.hbs", { colors: "Rojo" } ))

export default router