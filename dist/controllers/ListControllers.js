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
exports.deleteListController = exports.updateListConstroller = exports.newlistcontroller = exports.getlistbyid = exports.listController = void 0;
const List_1 = __importDefault(require("../models/List"));
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
const listController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // throw createHttpError(401);
        const todolists = yield List_1.default.find().exec();
        res.status(200).json(todolists);
    }
    catch (error) {
        next(error);
    }
});
exports.listController = listController;
const getlistbyid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const listid = req.params.listid;
    try {
        if (!mongoose_1.default.isValidObjectId(listid)) {
            throw (0, http_errors_1.default)(400, "Invalid TODO List ID");
        }
        const todolist = yield List_1.default.findById(listid).exec();
        if (!todolist) {
            throw (0, http_errors_1.default)(404, "Todo-list Not Found");
        }
        res.status(200).json(todolist);
    }
    catch (error) {
        next(error);
    }
});
exports.getlistbyid = getlistbyid;
const newlistcontroller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = req.body.task;
    const priority = req.body.priority;
    const duedate = req.body.duedate;
    const status = req.body.status;
    try {
        if (!task) {
            throw (0, http_errors_1.default)(400, "Please define a task");
        }
        if (!priority) {
            throw (0, http_errors_1.default)(400, "Please set a priority of your task");
        }
        const createnewlist = yield List_1.default.create({
            task: task,
            priority: priority,
            duedate: duedate,
            status: status,
        });
        res.status(201).json(createnewlist);
    }
    catch (error) {
        next(error);
    }
});
exports.newlistcontroller = newlistcontroller;
const updateListConstroller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const listid = req.params.listid;
    const newtask = req.body.task;
    const newpriority = req.body.priority;
    const newduedate = req.body.duedate;
    const newstatus = req.body.status;
    try {
        if (!mongoose_1.default.isValidObjectId(listid)) {
            throw (0, http_errors_1.default)(400, "Invalid TODO List ID");
        }
        if (!newtask) {
            throw (0, http_errors_1.default)(400, "Please define a task");
        }
        if (!newpriority) {
            throw (0, http_errors_1.default)(400, "Please set a priority of your task");
        }
        const todolist = yield List_1.default.findById(listid).exec();
        if (!todolist) {
            throw (0, http_errors_1.default)(404, "Todo-list not found");
        }
        todolist.task = newtask;
        todolist.priority = newpriority;
        todolist.duedate = newduedate;
        todolist.status = newstatus;
        const updatedList = yield todolist.save();
        res.status(200).json(updatedList);
    }
    catch (error) {
        next(error);
    }
});
exports.updateListConstroller = updateListConstroller;
const deleteListController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const listid = req.params.listid;
    try {
        if (!mongoose_1.default.isValidObjectId(listid)) {
            throw (0, http_errors_1.default)(400, "Invalid TODO List ID");
        }
        const todolist = yield List_1.default.findById(listid).exec();
        if (!todolist) {
            throw (0, http_errors_1.default)(404, "Todo-list not found");
        }
        const deleted = todolist.remove();
        res.status(204).json(deleted);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteListController = deleteListController;
//# sourceMappingURL=ListControllers.js.map