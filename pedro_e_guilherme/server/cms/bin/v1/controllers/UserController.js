"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
class UserController {
    async count(req, rep) {
        const count = await User_1.default.count();
        return rep.send({
            error: false,
            code: 200,
            count: count,
        });
    }
    async save(req, rep) {
        const { body } = req;
        const { profile_picture, name, email, password, cellphone } = body;
        await profile_picture.toBuffer();
        const url = await services_1.FirebaseService.uploadImage(profile_picture);
        const hashPassword = await bcryptjs_1.default.hash(password.value, 8);
        const data = {
            id: -1,
            profile_picture: url,
            name: name.value,
            email: email.value,
            password: hashPassword,
            cellphone: cellphone.value.toString(),
            isAdmin: false,
        };
        const user = await User_1.default.save(data);
        return rep.send({
            statusCode: 200,
            error: false,
            payload: [user],
        });
    }
    async delete(req, rep) {
        const { id } = req.params;
        const response = await User_1.default.delete(parseInt(id));
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
    async update(req, rep) {
        const { body } = req;
        const { id } = req.params;
        const { profile_picture, name, email, password, cellphone } = body;
        await profile_picture.toBuffer();
        const url = await services_1.FirebaseService.uploadImage(profile_picture);
        const hashPassword = await bcryptjs_1.default.hash(password.value, 8);
        const data = {
            id: parseInt(id),
            profile_picture: url,
            name: name.value,
            email: email.value,
            password: hashPassword,
            cellphone: cellphone.value.toString(),
            isAdmin: false,
        };
        const res = await User_1.default.update(data);
        if (!res) {
            return rep.status(400).send({
                code: 400,
                error: true,
                message: ["Bad Request"]
            });
        }
        return rep.send({
            code: 200,
            error: false,
            payload: ["succefull update"]
        });
    }
}
exports.default = new UserController();
