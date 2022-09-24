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
const data_source_1 = require("../../data-source");
const contact_entity_1 = require("../../entities/contact.entity");
const user_entity_1 = require("../../entities/user.entity");
const appError_1 = require("../../errors/appError");
const contactDeleteSelfService = (id, id_contact) => __awaiter(void 0, void 0, void 0, function* () {
    const contactRepository = data_source_1.AppDataSource.getRepository(contact_entity_1.Contact);
    const contactsList = yield contactRepository.find();
    const contact = contactsList.find((contact) => contact.id === id_contact);
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const userList = yield userRepository.find();
    const user = userList.find((user) => user.id === id);
    const userContactsId = user === null || user === void 0 ? void 0 : user.contacts.map((contactId) => contactId.id === id_contact);
    const verifyContact = userContactsId === null || userContactsId === void 0 ? void 0 : userContactsId.includes(true);
    if (!verifyContact) {
        throw new appError_1.AppError(404, "Not found contact");
    }
    yield contactRepository.delete(contact.id);
    return true;
});
exports.default = contactDeleteSelfService;
