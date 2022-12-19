import { user } from "@prisma/client";
import { db } from "../configs/database";

class User {
  async count() {
    const res = await db.user.count();
    return res;
  }
  async index() {
    const res = await db.user.findMany();
    return res;
  }

  async show(id: number) {
    const res = await db.user.findUnique({
      where: {
        id,
      },
    });

    return res;
  }

  async save(data: user) {
    const { id } = await db.user.create({
      data: {
        name: data.name,
        cellphone: data.cellphone,
        email: data.email,
        password: data.password,
        profile_picture: data.profile_picture as string,
        isAdmin: data.isAdmin,
      },
    });

    console.log(id);
    

    return id;
  }

  async update(newUser: user) {
    const res = await db.user.update({
      data: {
        name: newUser.name,
        email: newUser.email,
        profile_picture: newUser.profile_picture,
        password: newUser.password,
        cellphone: newUser.cellphone,
      },
      where: {
        id: newUser.id,
      },
    });

    return res;
  }

  async delete(id: number) {
    const res = await db.user.delete({
      where: {
        id,
      },
    });

    if (!res) return false;
    return true;
  }

  async getUserProducts(id: number) {
    const res = await db.user.findMany({
      where: {
        id,
      },
      select: {
        product: true,
      },
    });

    return res;
  }

  async getUserByEmail(email: string) {
    const res = await db.user.findMany({
      where: {
        email,
      },
    });

    return res;
  }
}

export default new User();
