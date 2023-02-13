import { config } from "dotenv"
console.log(config());

// import { Application } from "oak"
// import { logger } from "@utils/loggers.ts"
// import apiRoutes from '@routes/index.routes.ts'

// const { PORT = 3000 } = config()

// const app = new Application()

// app.use(apiRoutes.routes())

// app.addEventListener("listen", ({ secure, hostname, port }) => {
//     const protocol = secure ? "https://" : "http://";
//     const url = `${protocol}${hostname == '0.0.0.0' ? "localhost" : hostname}:${port}`;
//     logger.success(`Listening on: ${url}`);
// });

// await app.listen({ port: +PORT })
