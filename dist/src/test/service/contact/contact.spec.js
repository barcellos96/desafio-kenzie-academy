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
const data_source_1 = require("../../../data-source");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
describe("Create an user", () => {
    let connection;
    const contact1 = {
        name: "Test",
        email: "felipe1@kenzie.com.br",
        contact: "0000-0000",
    };
    const contact2 = {
        name: "Test 2",
        email: "felipe2@kenzie.com.br",
    };
    const user = {
        name: "test",
        email: "test@email.com",
        password: "12345",
        phone: "9999-9999",
    };
    const userLogin = {
        email: "test@email.com",
        password: "12345",
    };
    let createUser;
    let loginUser;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during DataSource initialization", err);
        });
        createUser = yield (0, supertest_1.default)(app_1.default).post("/users").send(user);
        loginUser = yield (0, supertest_1.default)(app_1.default).post("/users/login").send(userLogin);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it("Should insert the information of new user in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`/users/contacts/${createUser.body.id}`)
            .send(contact1)
            .set("Authorization", `Bearer ${loginUser.body.token}`);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("contact");
    }));
    it("Testing create missing field ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(`/users/contacts/${createUser.body.id}`)
            .send(contact2)
            .set("Authorization", `Bearer ${loginUser.body.token}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "fill in all fields");
    }));
});
