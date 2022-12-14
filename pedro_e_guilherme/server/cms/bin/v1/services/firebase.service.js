"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebase_key_json_1 = __importDefault(require("../configs/firebase-key.json"));
class FirebaseService {
    app;
    constructor(app = firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(firebase_key_json_1.default),
        storageBucket: "senai-pizzaria.appspot.com",
    })) {
        this.app = app;
    }
    async uploadImage(fileParameter) {
        const imagem = fileParameter;
        const bucket = firebase_admin_1.default.storage().bucket();
        const fileName = Date.now() + "." + imagem.filename.split(".").pop();
        const file = bucket.file(fileName);
        const stream = file.createWriteStream({
            metadata: {
                contentType: imagem.mimetype,
            },
        });
        stream.on("error", (err) => console.log(err));
        stream.on("finish", async () => {
            await file.makePublic();
        });
        stream.end(imagem._buf);
        return `https://storage.googleapis.com/senai-pizzaria.appspot.com/${fileName}`;
    }
}
exports.default = new FirebaseService();
