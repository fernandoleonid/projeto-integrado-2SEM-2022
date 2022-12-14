"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bebida_1 = __importDefault(require("../models/Bebida"));
class DrinkTypeController {
    async index(req, rep) {
        const response = await Bebida_1.default.getBebidaTypes();
        return rep.send({
            code: 200,
            error: false,
            payload: response,
        });
    }
    async show(req, rep) {
        const { id } = req.params;
        const response = await Bebida_1.default.getBebidaTypeById(parseInt(id));
        if (!response) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Content not Founded"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            payload: [response],
        });
    }
    async delete(req, rep) {
        const { id } = req.params;
        const response = await Bebida_1.default.deleteBebidaTypes(parseInt(id));
        if (!response) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Content not Founded"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: ["Succefull Deleted"],
        });
    }
    async activate(req, rep) {
        const { id } = req.params;
        const response = await Bebida_1.default.activateBebidaTypes(parseInt(id));
        if (!response) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Content not Founded"],
            });
        }
        return rep.send({
            code: 200,
            error: false,
            message: ["Succefull Activated!"],
        });
    }
    async save(req, rep) {
        const { name } = req.body;
        const typeExist = await Bebida_1.default.getBebidaTypeByName(name);
        if (typeExist) {
            return rep.status(400).send({
                code: 400,
                error: true,
                message: ["This type of drink already exist"],
            });
        }
        const response = await Bebida_1.default.saveBebidaTypes({
            id: -1,
            name,
            status: true,
        });
        return rep.send({
            code: 200,
            error: false,
            payload: [response],
        });
    }
    async update(req, rep) {
        const { id } = req.params;
        const { name } = req.body;
        const typeExist = await Bebida_1.default.getBebidaTypeById(parseInt(id));
        if (!typeExist) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["This type of drink doesnt exist!, bad id value"],
            });
        }
        const typeNameExist = await Bebida_1.default.getBebidaTypeByName(name);
        if (typeNameExist) {
            return rep.status(400).send({
                code: 400,
                error: true,
                message: ["This type of drink already exist"],
            });
        }
        await Bebida_1.default.updateBebidaTypes({
            id: parseInt(id),
            name,
            status: true,
        });
        return rep.send({
            code: 200,
            error: false,
            message: ["Succefull Updated!"],
        });
    }
}
exports.default = new DrinkTypeController();
