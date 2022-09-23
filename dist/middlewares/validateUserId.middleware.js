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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entities/user.entity");
const validateUserIdMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const userId = req.userId;
    const { id } = req.params;
    const users = yield userRepository.find();
    const idExist = users.find((user) => user.id === id);
    if (!idExist) {
        return res.status(404).json({ message: "user not found" });
    }
    if (id !== userId) {
        return res.status(401).json({
            message: "you cannot update/delete a user other than you",
        });
    }
    next();
});
exports.default = validateUserIdMiddleware;
