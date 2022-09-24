"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../../errors/appError");
const userCreate_service_1 = __importDefault(require("../../services/User/userCreate.service"));
const userCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // acessando os dados do corpo da requisição,
        // usando desestruturação
        const { name, email, password, phone } = req.body;
        // chamando o Service que vai retornar o newUser,
        // que será inferido pelo TS como tipo IUser
        const newUser = yield (0, userCreate_service_1.default)({ name, email, password, phone });
        // retornando 201 com JSON do newUser para o cliente
        return res.status(201).send(newUser);
    }
    catch (err) {
        if (err instanceof appError_1.AppError) {
            (0, appError_1.handleError)(err, res);
        }
    }
});
exports.default = userCreateController;
