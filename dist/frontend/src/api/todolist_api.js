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
exports.deleteTodoList = exports.updateTodoList = exports.createTodoList = exports.fetchTodoList = void 0;
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
function updateTodoList(list) {
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
exports.updateTodoList = updateTodoList;
// export async function updateStatus(listid: string, status:string): Promise<todolist> {
//     const response = await fetchData("/api/todolist/" + listid,
//     {
//      method:"PATCH",
//      headers:{
//         "Content-Type": "application/json",
//      },
//      body:JSON.stringify({status}),    
//     });
//     return response.json();
// }
function deleteTodoList(listid) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetchData("/api/todolist/" + listid, { method: "DELETE" });
    });
}
exports.deleteTodoList = deleteTodoList;
