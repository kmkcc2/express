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
const supertest_1 = __importDefault(require("supertest"));
const user_repository_1 = __importDefault(require("../src/repositories/user.repository"));
const app_1 = __importDefault(require("../app"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../src/models/user");
const users = [];
const user = new user_1.User({
    id: 1,
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    password: 'pasw'
});
let accessTokenGlobal = '';
const userPayload = {
    firstName: 'test',
    lastName: 'test',
    email: 'em@il.com',
    password: '$2a$10$wi8X/E01k8jVJgNdwQexZeN0QVbESrgIVXim1yRfL9QAnM73j2.6K'
};
beforeEach(() => {
    const SECRET = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jsonwebtoken_1.default.sign(userPayload, SECRET, { expiresIn: '1h' });
    accessTokenGlobal = accessToken;
});
describe('GET /users', () => {
    test('should respond with 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserRepositoryMock = jest
            .spyOn(user_repository_1.default, 'findAll')
            .mockResolvedValueOnce(users);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default)
            .get('/users')
            .set('authorization', 'Bearer ' + accessTokenGlobal);
        expect(UserRepositoryMock).toBeCalled();
        expect(statusCode).toBe(200);
    }));
    test('should respond with 401 status code when without access token', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(app_1.default).get('/users');
        expect(statusCode).toBe(401);
    }));
});
describe('GET /users/:id', () => {
    test('should respond with 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserRepositoryMock = jest
            .spyOn(user_repository_1.default, 'findUserById')
            .mockResolvedValueOnce(user);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default)
            .get('/users/1')
            .set('authorization', 'Bearer ' + accessTokenGlobal);
        expect(UserRepositoryMock).toBeCalled();
        expect(statusCode).toBe(200);
    }));
    test('should respond with 401 status code when without access token', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(app_1.default).get('/users/1');
        expect(statusCode).toBe(401);
    }));
    test('should respond with 400 status code when id invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const { statusCode } = yield (0, supertest_1.default)(app_1.default)
            .get('/users/1a')
            .set('authorization', 'Bearer ' + accessTokenGlobal);
        expect(statusCode).toBe(400);
    }));
});
describe('POST /users', () => {
    test('should respond with 200 status code and return new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserRepositoryMock = jest
            .spyOn(user_repository_1.default, 'createUser')
            .mockResolvedValueOnce(user);
        const UserFindByEmailMock = jest
            .spyOn(user_repository_1.default, 'findUserByEmail')
            .mockResolvedValue(null);
        const { statusCode, body } = yield (0, supertest_1.default)(app_1.default).post('/register').send({
            firstName: 'test',
            lastName: 'test',
            email: 'email@em.com',
            password: 'password'
        });
        expect(UserFindByEmailMock).toBeCalled();
        expect(UserRepositoryMock).toBeCalled();
        expect(body.firstName).toBe('test');
        expect(statusCode).toBe(200);
    }));
    test('should respond with 422 when email already taken', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserRepositoryMock = jest
            .spyOn(user_repository_1.default, 'createUser')
            .mockResolvedValueOnce(user);
        const UserFindByEmailMock = jest
            .spyOn(user_repository_1.default, 'findUserByEmail')
            .mockResolvedValue(user);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default).post('/register').send({
            firstName: 'asd',
            lastName: 'asd',
            email: 'test@test.com',
            password: 'password123'
        });
        expect(UserFindByEmailMock).toBeCalled();
        expect(UserRepositoryMock).toBeCalled();
        expect(statusCode).toBe(422);
    }));
    test('should respond with 400 when user payload is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserRepositoryMock = jest
            .spyOn(user_repository_1.default, 'createUser')
            .mockResolvedValueOnce(user);
        const UserFindByEmailMock = jest
            .spyOn(user_repository_1.default, 'findUserByEmail')
            .mockResolvedValue(user);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default)
            .post('/register')
            .send({ firstName: 'asd', lastName: 'asd', email: 'test@test.com' });
        expect(UserFindByEmailMock).toBeCalled();
        expect(UserRepositoryMock).toBeCalled();
        expect(statusCode).toBe(400);
    }));
    describe('DELETE /users/:id', () => {
        test('should respond with 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const UserRepositoryMock = jest
                .spyOn(user_repository_1.default, 'deleteUser')
                .mockResolvedValueOnce(1);
            const { statusCode } = yield (0, supertest_1.default)(app_1.default)
                .delete('/users/1')
                .set('authorization', 'Bearer ' + accessTokenGlobal);
            expect(UserRepositoryMock).toBeCalled();
            expect(statusCode).toBe(200);
        }));
        test('should respond with 404 when user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const UserRepositoryMock = jest
                .spyOn(user_repository_1.default, 'deleteUser')
                .mockResolvedValueOnce(0);
            const { statusCode } = yield (0, supertest_1.default)(app_1.default)
                .delete('/users/1')
                .set('authorization', 'Bearer ' + accessTokenGlobal);
            expect(UserRepositoryMock).toBeCalled();
            expect(statusCode).toBe(404);
        }));
    });
    describe('PUT /users/:id', () => {
        test('should respond with 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const UserRepositoryMock = jest
                .spyOn(user_repository_1.default, 'updateUser')
                .mockResolvedValueOnce([1]);
            const UserFindByIdMock = jest
                .spyOn(user_repository_1.default, 'findUserById')
                .mockResolvedValueOnce(user);
            const { statusCode } = yield (0, supertest_1.default)(app_1.default)
                .put('/users/1')
                .send({ firstName: 'update' })
                .set('authorization', 'Bearer ' + accessTokenGlobal);
            expect(UserFindByIdMock).toBeCalled();
            expect(UserRepositoryMock).toBeCalled();
            expect(statusCode).toBe(200);
        }));
        test('should respond with 404 when user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const UserRepositoryMock = jest
                .spyOn(user_repository_1.default, 'updateUser')
                .mockResolvedValueOnce([0]);
            const UserFindByIdMock = jest
                .spyOn(user_repository_1.default, 'findUserById')
                .mockResolvedValueOnce(null);
            const { statusCode } = yield (0, supertest_1.default)(app_1.default)
                .put('/users/1')
                .send({ firstName: 'update' })
                .set('authorization', 'Bearer ' + accessTokenGlobal);
            expect(UserFindByIdMock).toBeCalled();
            expect(UserRepositoryMock).toBeCalled();
            expect(statusCode).toBe(404);
        }));
    });
});