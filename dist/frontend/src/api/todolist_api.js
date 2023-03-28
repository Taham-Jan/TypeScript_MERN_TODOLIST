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
exports.deleteTodoList = exports.updateTodoList = exports.updateStatus = exports.createTodoList = exports.fetchTodoList = exports.logout = exports.login = exports.signUp = exports.fetchLoggedInUser = void 0;
function fetchData(input, init) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(input, init);
        if (response.ok) {
            return response;
        }
        else {
            const errorBody = yield response.json();
            const errorMessage = errorBody.error;
            throw Error(errorMessage);
        }
    });
}
;
function fetchLoggedInUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetchData("/api/users", { method: "GET" });
        return response.json();
    });
}
exports.fetchLoggedInUser = fetchLoggedInUser;
;
;
function signUp(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetchData("/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        return response.json();
    });
}
exports.signUp = signUp;
;
function login(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetchData("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        return response.json();
    });
}
exports.login = login;
;
function logout() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetchData("/api/users/logout", { method: "POST" });
    });
}
exports.logout = logout;
;
function fetchTodoList() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetchData("/api/todolist", { method: "GET" });
        return response.json();
    });
}
exports.fetchTodoList = fetchTodoList;
function createTodoList(list) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetchData("/api/todolist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(list),
        });
        return response.json();
    });
}
exports.createTodoList = createTodoList;
function updateStatus(list) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetchData("/api/todolist/" + list._id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                task: list.task,
                priority: list.priority,
                duedate: list.duedate,
                status: list.status
            }),
        });
        return response.json();
    });
}
exports.updateStatus = updateStatus;
function updateTodoList(listId, list) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetchData("/api/todolist/" + listId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(list),
        });
        return response.json();
    });
}
exports.updateTodoList = updateTodoList;
function deleteTodoList(listid) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetchData("/api/todolist/" + listid, { method: "DELETE" });
    });
}
exports.deleteTodoList = deleteTodoList;
//# sourceMappingURL=todolist_api.js.map