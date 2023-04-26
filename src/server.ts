import Fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod'
import { helloRoute } from './routes/v1/hello'

const fastify = Fastify()
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

// Configure routes
fastify.after(() => {
    fastify.register(helloRoute, { prefix: '/v1/' })
})

export async function run() {
    const PORT = process.env.PORT || "3000"

    await fastify.ready()
    await fastify.listen({ port: parseInt(PORT) })

    console.log(`Server running at http://localhost:${PORT}`)
}