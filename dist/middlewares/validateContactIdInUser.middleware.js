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
const contact_entity_1 = require("../entities/contact.entity");
const validateContactIdInUserMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const contactRepository = data_source_1.AppDataSource.getRepository(contact_entity_1.Contact);
    const userId = req.userId;
    const { id_contact } = req.params;
    const contacts = yield contactRepository.find();
    const contactsId = contacts.find((contact) => console.log(contact.id));
    // if (!contactUserOk) {
    //   return res.status(401).json({
    //     message: "you cannot update/delete a contact other than you",
    //   });
    // }
    next();
});
exports.default = validateContactIdInUserMiddleware;
