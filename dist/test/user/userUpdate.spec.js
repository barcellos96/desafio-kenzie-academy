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
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
describe("Teste para metodo PATCH em /users/me/:id", () => {
    let connection;
    let testUser1 = {
        name: "Teste Kenzie",
        email: "teste@kenzie.com",
        password: "123456Ab!",
        phone: "teste@kenzie.com",
    };
    let testUser2 = {
        name: "Teste2 Kenzie",
        email: "teste2@kenzie.com",
        password: "123456Ab!",
        phone: "teste2@kenzie.com",
    };
    let response1;
    let validEmail;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        response1 = yield (0, supertest_1.default)(app_1.default).post("/users").send(testUser1);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("Trying to update an user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = {
            email: testUser1.email,
            password: testUser1.password,
        };
        const login = yield (0, supertest_1.default)(app_1.default).post("/users/login").send(userLogin);
        const { token } = login.body;
        const responsePatch = yield (0, supertest_1.default)(app_1.default)
            .patch(`/users/me/${response1.body.id}`)
            .send(testUser2)
            .set("Authorization", `Bearer ${token}`);
        const responseGet = yield (0, supertest_1.default)(app_1.default)
            .patch(`/users/me/${response1.body.id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(responsePatch.status).toEqual(201);
        expect(responseGet.statusCode).toBe(201);
    }));
    test("Trying to update a user that doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/users/me/1`);
        expect(response.status).toEqual(404);
    }));
});
