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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const users_1 = require("../services/users");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, users_1.getAllUsers)();
    res.status(200).json({ users });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield (0, users_1.getById)(id);
    if (!user) {
        return res.status(404).json({
            msg: 'User not found'
        });
    }
    res.status(200).json({
        user
    });
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        //TODO: Crear middleware para que no llegue al controler en caso de que ya exista un user con el email que se manda
        const existEmail = yield (0, users_1.findOne)(body.email);
        if (existEmail)
            return res.status(400).json({
                msg: 'The email is already in use'
            });
        const newUser = yield (0, users_1.createUser)(body);
        res.status(200).json(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const userDB = yield (0, users_1.getById)(id);
        if (!userDB)
            return res.status(404).json({
                msg: `There is no user with id ${id}`
            });
        yield (0, users_1.update)(userDB, body);
        res.status(200).json({ userDB });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userDB = yield (0, users_1.getById)(id);
    if (!userDB)
        return res.status(404).json({
            msg: `There is no user with id ${id}`
        });
    // Eliminacion fisica
    // await physicalElimination(userDB);
    // Eliminacion logica
    yield (0, users_1.logicalElimination)(userDB);
    res.json({
        msg: 'Deleted user'
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map