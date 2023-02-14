import { Router } from 'oak'
import colorsRoutes from '@routes/colors.routes.ts'
import { getColors } from '@daos/colors/colors.memory.dao.ts'

const router = new Router()

router.use(colorsRoutes.routes())

router.get('/', async (ctx) => {
    const colors = await getColors()
    ctx.render("index.hbs", colors.length !== 0 ? { colors: colors } : null )
})

export default router