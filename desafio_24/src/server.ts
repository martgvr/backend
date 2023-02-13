import { config } from "dotenv"
import { Application } from "oak"
import { logger } from "@utils/loggers.ts"
import apiRoutes from '@routes/index.routes.ts'

import { viewEngine, handlebarsEngine, oakAdapter } from "https://deno.land/x/view_engine@v10.5.1c/mod.ts"

const { PORT = 3000 } = config()

const app = new Application()

app.use(
  viewEngine(oakAdapter, handlebarsEngine, {
    viewRoot: "./views/",
  })
)

app.use(apiRoutes.routes())

app.addEventListener("listen", ({ secure, hostname, port }) => {
    const protocol = secure ? "https://" : "http://"
    const url = `${protocol}${hostname == '0.0.0.0' ? "localhost" : hostname}:${port}`
    logger.success(`Listening on: ${url}`)
});

await app.listen({ port: +PORT })
