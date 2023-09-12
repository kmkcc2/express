"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const user_controller_1 = require("../controllers/user.controller");
const request_validation_1 = require("../middleware/request-validation");
const users_requests_validations_1 = require("../middleware/validators/users-requests-validations");
const login_validations_1 = __importDefault(require("../middleware/validators/login-validations"));
const router = express_1.default.Router();
router
    .route('/login')
    .post((0, request_validation_1.validateRequest)(login_validations_1.default), auth_controller_1.login);
router
    .route('/register')
    .post((0, request_validation_1.validateRequest)(users_requests_validations_1.createValidation), user_controller_1.create);
exports.default = router;
