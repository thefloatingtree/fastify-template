import { FastifyPluginAsync } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export const helloRoute: FastifyPluginAsync = async (server) => {
    const configuredServer = server.withTypeProvider<ZodTypeProvider>()
    
    configuredServer.get(
        '/hello/:name',
        {
            schema: {
                tags: ["Hello"],
                params: z.object({
                    name: z.string().describe('Your name :)'),
                }),
                response: {
                    200: z.object({ hello: z.string().describe('Hello world!') })
                }
            }
        },
        (req, res) => {
            res.code(200)
            res.send({ hello: req.params.name });
        }
    )
}