import { FastifyRequest, FastifyReply } from "fastify";
import { FirebaseService } from "../services";
import bcryptjs from 'bcryptjs';
import User from "../models/User";

class UserController {
  async count(req: FastifyRequest, rep: FastifyReply) {
    const count = await User.count();
    return rep.send({
      error: false,
      code: 200,
      count: count,
    });
  }

  async save(req: FastifyRequest, rep: FastifyReply) {
    const { body } = req;

    // @ts-ignore
    const { profile_picture, name, email, password, cellphone } = body;

    await profile_picture.toBuffer();

    const url = await FirebaseService.uploadImage(profile_picture);

    const hashPassword = await bcryptjs.hash(password.value, 8);

    const data = {
      id: -1,
      profile_picture: url,
      name: name.value,
      email: email.value,
      password: hashPassword,
      cellphone: cellphone.value.toString(),
      isAdmin: false,
    };

    const user = await User.save(data);

    return rep.send({
      statusCode: 200,
      error: false,
      payload: [user],
    });
  }

  async delete(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const response = await User.delete(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 400,
        error: true,
        message: ["Not Founded"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      payload: ["Success Deleted"],
    });
  }

  async update(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { body } = req;
    const { id } = req.params;

    // @ts-ignore
    const { profile_picture, name, email, password, cellphone } = body;

    await profile_picture.toBuffer();

    const url = await FirebaseService.uploadImage(profile_picture);

    const hashPassword = await bcryptjs.hash(password.value, 8);

    const data = {
      id: parseInt(id),
      profile_picture: url,
      name: name.value,
      email: email.value,
      password: hashPassword,
      cellphone: cellphone.value.toString(),
      isAdmin: false,
    };

    const res = await User.update(data);

    if (!res) {
      return rep.status(400).send({
        code: 400,
        error: true,
        message: ["Bad Request"]
      })
    }

    return rep.send({
      code: 200,
      error: false,
      payload: ["succefull update"]
    })
  }
}

export default new UserController();
