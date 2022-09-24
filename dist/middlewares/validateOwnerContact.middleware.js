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
const validateOwnerContactMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_contact } = req.params;
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const userList = yield userRepository.find();
    const user = userList.find((user) => user.id === id);
    const userContactsId = user === null || user === void 0 ? void 0 : user.contacts.map((element) => element.id === id_contact);
    const verifyContact = userContactsId === null || userContactsId === void 0 ? void 0 : userContactsId.includes(true);
    if (!verifyContact) {
        return res
            .status(401)
            .json({ message: "you cannot update/delete a contact other than you" });
    }
    next();
});
exports.default = validateOwnerContactMiddleware;
