"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoggedOutView_1 = __importDefault(require("../components/LoggedOutView"));
const Todolist_1 = __importDefault(require("../components/Todolist"));
const TodoListPage = ({ loggedInUser, dateTimeLogo, priorityLogo, taskLogo }) => {
    return (<>                  {loggedInUser ? <Todolist_1.default dateTimeLogo={dateTimeLogo} priorityLogo={priorityLogo} taskLogo={taskLogo}/> : <LoggedOutView_1.default />}
    </>);
};
exports.default = TodoListPage;
//# sourceMappingURL=TodoListPage.js.map