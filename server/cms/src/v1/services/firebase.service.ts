import admin from "firebase-admin";
import options from "../configs/firebase-key.json";

interface IFile {
  filename: string,
  mimetype: string,
  _buf: Buffer
}

class FirebaseService {
  constructor(
    private app = admin.initializeApp({
      // @ts-ignore
      credential: admin.credential.cert(options),
      storageBucket: "senai-pizzaria.appspot.com",
    })
  ) {}

  async uploadImage(fileParameter: IFile): Promise<string> {
    const imagem = fileParameter;

    const bucket = admin.storage().bucket();

    const fileName = Date.now() + "." + imagem.filename.split(".").pop();

    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: imagem.mimetype,
      },
    });

    stream.on("error", (err: Error) => console.log(err));

    stream.on("finish", async () => {
      await file.makePublic();
    });

    stream.end(imagem._buf);

    return `https://storage.googleapis.com/senai-pizzaria.appspot.com/${fileName}`;
  }
}

export default new FirebaseService();
