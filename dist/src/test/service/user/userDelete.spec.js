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
const app_1 = __importDefault(require("../../../app"));
const supertest_1 = __importDefault(require("supertest"));
const userTest1 = {
    name: "test",
    email: "test@email.com",
    password: "12345",
    phone: "9999-9999",
};
const userTest2 = {
    name: "test 2",
    email: "test2@email.com",
    password: "12345",
    phone: "9999-9999",
};
const test1Login = {
    email: "test@email.com",
    password: "12345",
};
const test2Login = {
    email: "test2@email.com",
    password: "12345",
};
const ErroLogin = {
    email: "test@email.com",
    password: "123456",
};
describe("Testing route DELETE /users/me/:id", () => {
    let connection;
    let create1;
    let create2;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        create1 = yield (0, supertest_1.default)(app_1.default).post("/users").send(userTest1);
        create2 = yield (0, supertest_1.default)(app_1.default).post("/users").send(userTest2);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it("Testing tokenless deletion", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app_1.default).post("/users/login").send(test1Login);
        const { token } = login.body;
        const user = yield (0, supertest_1.default)(app_1.default)
            .get("/users/me")
            .set("Authorization", `Bearer ${token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/users/me/${user.body.uuid}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Invalid Token!");
    }));
    it("Testing Deleting Another User", () => __awaiter(void 0, void 0, void 0, function* () {
        const signinUser1 = yield (0, supertest_1.default)(app_1.default)
            .post("/users/login")
            .send(test1Login);
        const signinUser2 = yield (0, supertest_1.default)(app_1.default)
            .post("/users/login")
            .send(test2Login);
        const token1 = signinUser1.body.token;
        const token2 = signinUser2.body.token;
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/users/me/${create1.body.id}`)
            .set("Authorization", `Bearer ${token2}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "you cannot update/delete a user other than you");
    }));
    it("Testing Deleting Owner User", () => __awaiter(void 0, void 0, void 0, function* () {
        const signin = yield (0, supertest_1.default)(app_1.default).post("/users/login").send(test1Login);
        const token = signin.body.token;
        const user = yield (0, supertest_1.default)(app_1.default)
            .get("/users/me")
            .set("Authorization", `Bearer ${token}`);
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/users/me/${user.body.id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.body).toHaveProperty("message", "User deleted with sucess!");
    }));
});
