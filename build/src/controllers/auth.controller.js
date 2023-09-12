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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.default.findUserByEmail(req.body.email);
    if (!user) {
        return res
            .status(404)
            .send({ message: 'User with provided email does not exist.' });
    }
    const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    };
    if (bcryptjs_1.default.compareSync(req.body.password, user.password)) {
        const SECRET = process.env.ACCESS_TOKEN_SECRET;
        const accessToken = jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: '1h' });
        return res.send({
            token: accessToken
        });
    }
    return res.status(401).send({ message: 'Password is invalid' });
});
exports.login = login;
