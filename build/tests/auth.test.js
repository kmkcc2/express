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
const app_1 = __importDefault(require("../app"));
const user_1 = require("../src/models/user");
const user_repository_1 = __importDefault(require("../src/repositories/user.repository"));
const supertest_1 = __importDefault(require("supertest"));
const userPayload = new user_1.User({
    id: -1,
    firstName: 'test',
    lastName: 'test',
    email: 'em@il.com',
    password: '$2a$10$wi8X/E01k8jVJgNdwQexZeN0QVbESrgIVXim1yRfL9QAnM73j2.6K',
    createdAt: '2023-08-28T14:16:22.339Z',
    updatedAt: '2023-08-28T14:16:22.339Z'
});
describe('POST to /login', () => {
    test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserRepositoryMock = jest.spyOn(user_repository_1.default, 'findUserByEmail').mockResolvedValueOnce(userPayload);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default).post('/login').send({
            email: 'em@il.com',
            password: 'qwerty123'
        });
        expect(statusCode).toBe(200);
        expect(UserRepositoryMock).toBeCalled();
    }));
    test('should respond with a 404 when email invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserRepositoryMock = jest.spyOn(user_repository_1.default, 'findUserByEmail').mockResolvedValueOnce(null);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default).post('/login').send({
            email: 'invalid@email.com',
            password: 'qwerty123'
        });
        expect(statusCode).toBe(404);
        expect(UserRepositoryMock).toBeCalled();
    }));
    test('should respond with a 401 when password invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserRepositoryMock = jest.spyOn(user_repository_1.default, 'findUserByEmail').mockResolvedValueOnce(userPayload);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default).post('/login').send({
            email: 'em@il.com',
            password: 'invalidPassword'
        });
        expect(statusCode).toBe(401);
        expect(UserRepositoryMock).toBeCalled();
    }));
    test('should respond with a 400 when email not an actual email', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserRepositoryMock = jest.spyOn(user_repository_1.default, 'findUserByEmail').mockResolvedValueOnce(userPayload);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default).post('/login').send({
            email: 'em',
            password: 'invalidPassword'
        });
        expect(statusCode).toBe(400);
        expect(UserRepositoryMock).toBeCalled();
    }));
});
