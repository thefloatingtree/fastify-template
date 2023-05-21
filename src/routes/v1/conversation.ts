import { FastifyPluginAsync } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { CommentSchema, ConversationCreateInputSchema, ConversationSchema } from "../../../prisma/generated/zod";

export const conversationRoute: FastifyPluginAsync = async (server) => {
    const configuredServer = server.withTypeProvider<ZodTypeProvider>()

    configuredServer.get(
        '/conversation/:resourceType/:resourceId',
        {
            schema: {
                tags: ["Conversation"],
                params: z.object({
                    resourceType: z.string().describe('The database resource type being commented on'),
                    resourceId: z.coerce.number().describe('The database resource id being commented on'),
                }),
                response: {
                    200: ConversationSchema.merge(z.object({ comments: CommentSchema.array() })),
                    404: z.object({ error: z.string() })
                }
            }
        },
        async (req, res) => {
            const conversation = await prisma.conversation.findUnique({
                where: {
                    resourceId_resourceType: {
                        resourceId: req.params.resourceId,
                        resourceType: req.params.resourceType,
                    }
                },
                include: {
                    comments: true
                }
            })
            if (!conversation) return res.code(404).send({ error: "conversation not found" })
            res.code(200).send(conversation)
        }
    )

    configuredServer.post(
        '/conversation',
        {
            schema: {
                tags: ["Conversation"],
                body: ConversationCreateInputSchema,
                response: {
                    200: ConversationSchema.merge(z.object({ comments: CommentSchema.array() }))
                }
            },
        },
        async (req, res) => {
            const conversation = await prisma.conversation.create({
                data: req.body,
                include: {
                    comments: true
                }
            })
            res.code(200).send(conversation)
        }
    )
}