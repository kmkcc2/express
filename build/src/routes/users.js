"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const users_requests_validations_1 = require("../middleware/validators/users-requests-validations");
const request_validation_1 = require("../middleware/request-validation");
const router = express_1.default.Router();
router
    .route('/:id')
    .get(user_controller_1.findOne)
    .put((0, request_validation_1.validateRequest)(users_requests_validations_1.putValidation), user_controller_1.update)
    .delete(user_controller_1.destroy);
router
    .route('/')
    .get(user_controller_1.findAll);
exports.default = router;
