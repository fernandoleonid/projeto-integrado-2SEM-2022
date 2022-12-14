import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      payload: {
        name: string;
        isAdmin: boolean;
        password: string;
        id: number;
        email: string;
        cellphone: number;
        profile_picture: string;
      };
    };
  }
}
