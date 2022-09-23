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
const contactCreateService = ({ id, name, email, contact }) => __awaiter(void 0, void 0, void 0, function* () {
    const contactsRepository = data_source_1.AppDataSource.getRepository(contact_entity_1.Contact);
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const user = yield userRepository.findOneBy({ id });
    if (!user) {
        throw new appError_1.AppError(404, "Not found user");
    }
    const newContact = new contact_entity_1.Contact();
    newContact.name = name;
    newContact.email = email;
    newContact.contact = contact;
    newContact.user = user === null || user === void 0 ? void 0 : user.id;
    contactsRepository.create(newContact);
    yield contactsRepository.save(newContact);
    return newContact;
});
exports.default = contactCreateService;
