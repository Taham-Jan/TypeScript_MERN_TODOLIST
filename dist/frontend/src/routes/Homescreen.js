"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Homescreen = void 0;
const Todolist_1 = __importDefault(require("../components/Todolist"));
const Homescreen = () => {
    return (<>
      <div><Todolist_1.default /></div>
      </>);
};
exports.Homescreen = Homescreen;
