import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { UserController } from "../../controllers/";
import User from "../../models/User";
import { createUserOptions, loginOptions } from "./user.schema";
import bcryptjs from 'bcryptjs';


export default async function userRoutes(server: FastifyInstance) {
  server.get(
    "/count",
    { onRequest: [server.authenticate] },
    UserController.count
  );
  // Create User
  server.post(
    "/register",
    { schema: createUserOptions, onRequest: [server.authenticate] },
    UserController.save
  );

  // Login (generate the jwt)
  server.post(
    "/login",
    { schema: loginOptions },
    async (
      req: FastifyRequest<{
        Body: {
          email: string;
          password: string;
        };
      }>,
      rep
    ) => {
      const { email, password } = req.body;

      const user = await User.getUserByEmail(email);

        
      if (user.length <= 0) {
        return rep.status(404).send({
          code: 404,
          error: true,
          message: ["Email not founded"],
        });
      }

      // check password is the same
      const isValidPassword = await bcryptjs.compare(password, user[0].password)

      if (!isValidPassword) {
        return rep.status(401).send({
          error: true,
          code: 401,
          message: ["Invalid Password! - Unauthorized"],
        });
      }

      const data = { payload: user[0] };

      const token = server.jwt.sign(data);

      return rep.send({
        code: 200,
        error: false,
        payload: { token },
      });
    }
  );

  // Delete user
  server.delete(
    "/:id",
    { onRequest: [server.authenticate] },
    UserController.delete
  );

  // Update user
  server.put(
    "/:id",
    { onRequest: [server.authenticate] },
    UserController.update
  );
} 
