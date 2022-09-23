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
const data_source_1 = require("../../data-source");
const user_entity_1 = require("../../entities/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const appError_1 = require("../../errors/appError");
const userUpdateService = ({ id, name, email, password, phone, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const user = yield userRepository.findOneBy({ id });
    if (!user) {
        throw new appError_1.AppError(404, "Not found user");
    }
    const userUpdate = {
        name: name || user.name,
        email: email || user.email,
        password: user.password,
        phone: phone || user.phone,
    };
    password && (userUpdate.password = bcrypt_1.default.hashSync(password, 10));
    yield userRepository.update(user.id, Object.assign({}, userUpdate));
    return Object.assign({}, userUpdate);
});
exports.default = userUpdateService;
