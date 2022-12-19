import { tbl_message } from "@prisma/client";
import { db } from "../config/database";

class Message {
  async save(data: tbl_message) {
    const response = await db.tbl_message.create({
      data: {
        cellphone: data.cellphone,
        content: data.content,
        critica: data.critica,
        email: data.email,
        name: data.name,
        phone: data.phone
      },
    });
    return response;
  }
}

export default new Message();
