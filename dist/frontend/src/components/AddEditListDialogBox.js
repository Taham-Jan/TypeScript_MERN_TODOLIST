"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const TodolistStyle_module_css_1 = __importDefault(require("../styles/TodolistStyle.module.css"));
const Button_module_css_1 = __importDefault(require("../styles/Button.module.css"));
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const ListApi = __importStar(require("../api/todolist_api"));
const AddEditListDialogBox = ({ dialogClose, onListEdit, onListSaved, taskLogo, priorityLogo, dateTimeLogo }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            task: (onListEdit === null || onListEdit === void 0 ? void 0 : onListEdit.task) || "",
            priority: (onListEdit === null || onListEdit === void 0 ? void 0 : onListEdit.priority) || [],
            duedate: (onListEdit === null || onListEdit === void 0 ? void 0 : onListEdit.duedate) || "",
            // status: onListEdit?.status || "",
        }
    });
    function onSubmit(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todoListResponse = yield ListApi.createTodoList(input);
                onListSaved(todoListResponse);
            }
            catch (error) {
                console.log(error);
                alert(error);
            }
        });
    }
    (0, react_1.useEffect)(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);
    return (<>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className={TodolistStyle_module_css_1.default.modalWrapper} onClick={dialogClose}></div>
        <div className={TodolistStyle_module_css_1.default.DialogBoxContainer}>
          <div className={TodolistStyle_module_css_1.default.flexrow}>
            <label className={TodolistStyle_module_css_1.default.label} htmlFor="Task">
              <img src={taskLogo} alt='' width='25' height='25'/>
              <label className={TodolistStyle_module_css_1.default.placeholder}>Task</label>
            </label>
            <input type="text" id="task" className={TodolistStyle_module_css_1.default.input} placeholder=' ' {...register("task", { required: "dyy bhai" })}/>
          </div>

          <div className={TodolistStyle_module_css_1.default.flexrow}>
            <label className={TodolistStyle_module_css_1.default.label} htmlFor="Priority">
              <img src={priorityLogo} alt='' width='25' height='25'/>
              <label className={TodolistStyle_module_css_1.default.placeholder}>PRIORITY</label>
            </label>
            <select className={TodolistStyle_module_css_1.default.input} {...register("priority")}>
              <option value=" " disabled selected hidden>Set Your Priotity</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>

          <div className={TodolistStyle_module_css_1.default.flexrow}>
            <label className={TodolistStyle_module_css_1.default.label} htmlFor="Date&Time">
              <img src={dateTimeLogo} alt='' width='25' height='25'/>
              <label className={TodolistStyle_module_css_1.default.placeholder}>Date | Time</label>
            </label>
            <input id="duedate" className={TodolistStyle_module_css_1.default.input} type='datetime-local' {...register("duedate")}/>
            {/* {errors.duedate && <p>{errors.duedate.message}</p>} */}
          </div>

          <div className={Button_module_css_1.default.DialogButtons}>
            <button className={`${Button_module_css_1.default.DialogButton} ${Button_module_css_1.default.buttonDesign}`} type="submit">Yes</button>
            <button onClick={dialogClose} className={`${Button_module_css_1.default.DialogButton} ${Button_module_css_1.default.buttonDesign}`}>Close</button>
          </div>
        </div>
      </form>
    </>);
};
exports.default = AddEditListDialogBox;
