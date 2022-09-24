"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = (0, express_1.Router)();
const userCreate_controller_1 = __importDefault(require("./controllers/User/userCreate.controller"));
const userDeleteSelf_controller_1 = __importDefault(require("./controllers/User/userDeleteSelf.controller"));
const userListOne_controller_1 = __importDefault(require("./controllers/User/userListOne.controller"));
const userLogin_controller_1 = __importDefault(require("./controllers/User/userLogin.controller"));
const validateUserCreate_middleware_1 = __importDefault(require("./middlewares/validateUserCreate.middleware"));
const validateUserId_middleware_1 = __importDefault(require("./middlewares/validateUserId.middleware"));
const authUser_middleware_1 = require("./middlewares/authUser.middleware");
const userUpdateSelf_controller_1 = __importDefault(require("./controllers/User/userUpdateSelf.controller"));
const contactCreate_controller_1 = __importDefault(require("./controllers/Contact/contactCreate.controller"));
const contactListUser_controller_1 = __importDefault(require("./controllers/Contact/contactListUser.controller"));
const contactDeleteSelf_controller_1 = __importDefault(require("./controllers/Contact/contactDeleteSelf.controller"));
const contactUpdateSelf_controller_1 = __importDefault(require("./controllers/Contact/contactUpdateSelf.controller"));
const validateOwnerContact_middleware_1 = __importDefault(require("./middlewares/validateOwnerContact.middleware"));
//USER
routes.post("/users", validateUserCreate_middleware_1.default, userCreate_controller_1.default);
routes.post("/users/login", userLogin_controller_1.default);
routes.get("/users/me", authUser_middleware_1.authUser, userListOne_controller_1.default);
routes.delete("/users/me/:id", authUser_middleware_1.authUser, validateUserId_middleware_1.default, userDeleteSelf_controller_1.default);
routes.patch("/users/me/:id", authUser_middleware_1.authUser, validateUserId_middleware_1.default, userUpdateSelf_controller_1.default);
//CONTACTS
routes.post("/users/contacts/:id", authUser_middleware_1.authUser, validateUserId_middleware_1.default, contactCreate_controller_1.default);
routes.get("/users/contacts", authUser_middleware_1.authUser, contactListUser_controller_1.default);
routes.delete("/users/contacts/:id/:id_contact", authUser_middleware_1.authUser, validateUserId_middleware_1.default, validateOwnerContact_middleware_1.default, contactDeleteSelf_controller_1.default);
routes.patch("/users/contacts/:id/:id_contact", authUser_middleware_1.authUser, validateUserId_middleware_1.default, validateOwnerContact_middleware_1.default, contactUpdateSelf_controller_1.default);
exports.default = routes;
