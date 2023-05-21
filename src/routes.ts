import { conversationRoute } from "./routes/v1/conversation"
import { helloRoute } from "./routes/v1/hello"
import { fastify } from "./server"

export function configureRoutes() {
    fastify.register(helloRoute, { prefix: '/v1/' })
    fastify.register(conversationRoute, { prefix: '/v1/' })
}