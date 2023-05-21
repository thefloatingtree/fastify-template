import Fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod'
import { prisma } from './lib/prisma'
import { configureRoutes } from './routes'

export const fastify = Fastify()
fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

fastify.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'SampleApi',
            description: 'Sample backend service',
            version: '1.0.0',
        },
        servers: [],
    },
    transform: jsonSchemaTransform,
})

fastify.register(fastifySwaggerUI, {
    routePrefix: '/docs',
})

fastify.addHook('onClose', () => {
    prisma.$disconnect()
})

fastify.after(() => {
    configureRoutes();
})

export async function run() {
    const PORT = process.env.PORT || "3000"

    await fastify.ready()
    await fastify.listen({ port: parseInt(PORT) })

    console.log(`Server running at http://localhost:${PORT}`)
}