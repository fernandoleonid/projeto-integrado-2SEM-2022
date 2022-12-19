import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (req: unknown, rep: unknown) => Promise<unknown>;
  }
}
