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
const react_1 = __importStar(require("react"));
const TodolistStyle_module_css_1 = __importDefault(require("../styles/TodolistStyle.module.css"));
const Icons_module_css_1 = __importDefault(require("../styles/Icons.module.css"));
const react_use_localstorage_1 = __importDefault(require("react-use-localstorage"));
const Button_module_css_1 = __importDefault(require("../styles/Button.module.css"));
const AddEditListDialogBox_1 = __importDefault(require("./AddEditListDialogBox"));
const todolistApi = __importStar(require("../api/todolist_api"));
const moon_svg_1 = __importDefault(require("../assets/moon.svg"));
const sun_svg_1 = __importDefault(require("../assets/sun.svg"));
const taskW_svg_1 = __importDefault(require("../assets/taskW.svg"));
const taskB_svg_1 = __importDefault(require("../assets/taskB.svg"));
const priorityB_svg_1 = __importDefault(require("../assets/priorityB.svg"));
const priorityW_svg_1 = __importDefault(require("../assets/priorityW.svg"));
const datetimeW_svg_1 = __importDefault(require("../assets/datetimeW.svg"));
const datetimeB_svg_1 = __importDefault(require("../assets/datetimeB.svg"));
const formatDate_1 = require("./formatDate");
const fa_1 = require("react-icons/fa");
const md_1 = require("react-icons/md");
const ai_1 = require("react-icons/ai");
const react_query_1 = require("react-query");
const todoCover = require('../assets/TODO-LIST.jpg');
const todoCoverDark = require('../assets/TODO-LIST-D.jpg');
const Todolist = () => {
    // THEME
    const [themeLogo, setThemeLogo] = (0, react_use_localstorage_1.default)("themeLogo", moon_svg_1.default);
    const [taskLogo, setTaskLogo] = (0, react_use_localstorage_1.default)("taskLogo", taskW_svg_1.default);
    const [priorityLogo, setpriorityLogo] = (0, react_use_localstorage_1.default)('priorityLogo', priorityW_svg_1.default);
    const [dateTimeLogo, setdateTimeLogo] = (0, react_use_localstorage_1.default)('dateTimeLogo', datetimeW_svg_1.default);
    const [todoHeader, setTodoHeader] = (0, react_use_localstorage_1.default)("todoHeader", todoCover);
    const [theme, setTheme] = (0, react_use_localstorage_1.default)("theme", "light-theme");
    const [showModal, setShowModal] = react_1.default.useState(false);
    const toggleTheme = () => {
        const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
        setTheme(newTheme);
        setThemeLogo(newTheme === "dark-theme" ? sun_svg_1.default : moon_svg_1.default);
        setTodoHeader(newTheme === "dark-theme" ? todoCoverDark : todoCover);
        setTaskLogo(newTheme === "dark-theme" ? taskB_svg_1.default : taskW_svg_1.default);
        setpriorityLogo(newTheme === "dark-theme" ? priorityB_svg_1.default : priorityW_svg_1.default);
        setdateTimeLogo(newTheme === "dark-theme" ? datetimeB_svg_1.default : datetimeW_svg_1.default);
    };
    (0, react_1.useEffect)(() => {
        document.body.className = theme;
    }, [theme]);
    const dialogOpen = () => setShowModal(true);
    const dialogClose = () => setShowModal(false);
    const [Todo, setTodo] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        function loadList() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const Todo = yield todolistApi.fetchTodoList();
                    setTodo(Todo);
                    console.log(Todo);
                }
                catch (error) {
                    console.log(error);
                    alert(error);
                }
            });
        }
        loadList();
    }, []);
    const { mutate: handleComplete } = (0, react_query_1.useMutation)((list) => {
        return todolistApi.updateTodoList(Object.assign(Object.assign({}, list), { status: !list.status }));
    }, {
        onSuccess: (data) => {
            // update the todoList state with the updated data
            setTodo(prevState => {
                return prevState.map(list => {
                    if (list._id === data._id) {
                        return Object.assign(Object.assign({}, list), { status: data.status });
                    }
                    else {
                        return list;
                    }
                });
            });
        }
    });
    function deleteList(list) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield todolistApi.deleteTodoList(list._id);
                setTodo(Todo.filter(existingList => existingList._id !== list._id));
            }
            catch (error) {
                console.log(error);
                alert(error);
            }
        });
    }
    let createdUpdatedDate;
    return (<>
      <div className={TodolistStyle_module_css_1.default.letter}>
        <img className={TodolistStyle_module_css_1.default.letterimg} src={todoHeader} alt="ICON"/>
        <div className={TodolistStyle_module_css_1.default.paper}>
          <div className={TodolistStyle_module_css_1.default.papercontent}>
            <div className={Button_module_css_1.default.DialogButtons}>
              <button onClick={dialogOpen} className={`${Button_module_css_1.default.DialogButton} ${Button_module_css_1.default.buttonDesign}`}><md_1.MdFormatListBulletedAdd style={{ fontSize: " 2.5vw", paddingRight: "15px" }}/>ADD NEW TODO LIST</button>
              <img src={themeLogo} id='moonlogo' alt=' ' onClick={() => toggleTheme()} style={{ cursor: "pointer", height: "9vw", width: "9vw", marginLeft: "auto" }}/>
            </div>
            {showModal &&
            <AddEditListDialogBox_1.default onListSaved={(newList) => { setTodo([...Todo, newList]); setShowModal(false); }} dialogClose={dialogClose} taskLogo={taskLogo} priorityLogo={priorityLogo} dateTimeLogo={dateTimeLogo}/>}
            {/*
          <div className={styles.tblheader}>
            <table>
              <thead>
                <tr>
                  <th style={{width:"30%"}}>task</th>
                  <th>date created</th>
                  <th>time to complete </th>
                  <th>priority</th>
                  <th>Status</th>
                  <th>action</th>
                </tr>
              </thead>
            </table>
          </div> */}
    
              <div className={TodolistStyle_module_css_1.default.tblcontent}>
                {Todo.map((list) => {
            if (list.updatedAt > list.createdAt) {
                createdUpdatedDate = "Updated: " + (0, formatDate_1.formatDate)(list.updatedAt);
            }
            else {
                createdUpdatedDate = "Created: " + (0, formatDate_1.formatDate)(list.createdAt);
            }
            return <>
                  <center>
                    <table>
                      <tr key={list._id} className={`priority-${list.priority}`}>
                        <th>task: <td className={TodolistStyle_module_css_1.default.textBox} role="textbox" style={{ resize: list.task && list.task.length > 20 ? 'vertical' : 'none' }}> {list.task}</td></th>
                        <th>date created <td>{(0, formatDate_1.formatDate)(createdUpdatedDate)}</td></th>
                        <th>time to complete  {list.duedate ? (<td>{(0, formatDate_1.formatDate)(list.duedate)}</td>) : (<td>NO DATE ASSIGNED</td>)}
                        </th>
                        <th>priority<td>{list.priority}</td></th>
                        <th>Status
                          {list.status ? (<td>Completed</td>) : (<td>Incomplete</td>)}</th>
                        <th>action <td>
                          <ai_1.AiOutlineFileDone onClick={(e) => { handleComplete(list); e.stopPropagation(); }} className={Icons_module_css_1.default.ico}/>
                          <fa_1.FaTrash onClick={(e) => { deleteList(list); e.stopPropagation(); }} className={Icons_module_css_1.default.ico}/>
                        </td></th>
                      </tr>
                    </table>
                    </center>
                  </>;
        })}
              </div>
         
            <br></br>
          </div>
        </div>
      </div>
    </>);
};
exports.default = Todolist;
