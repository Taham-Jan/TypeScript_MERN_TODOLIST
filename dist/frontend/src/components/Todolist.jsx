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
const Icons_module_css_1 = __importDefault(require("../styles/Icons.module.css"));
const TodolistStyle_module_css_1 = __importDefault(require("../styles/TodolistStyle.module.css"));
const fa_1 = require("react-icons/fa");
const todolistApi = __importStar(require("../api/todolist_api"));
const ai_1 = require("react-icons/ai");
const fa_2 = require("react-icons/fa");
const md_1 = require("react-icons/md");
const react_query_1 = require("react-query");
const Button_module_css_1 = __importDefault(require("../styles/Button.module.css"));
const AddEditListDialogBox_1 = __importDefault(require("./AddEditListDialogBox"));
const formatDate_1 = require("./formatDate");
const NotFoundPage_module_css_1 = __importDefault(require("../styles/NotFoundPage.module.css"));
const Spinner_1 = __importDefault(require("./Spinner"));
const Todolist = ({ dateTimeLogo, priorityLogo, taskLogo }) => {
    const [showModal, setShowModal] = react_1.default.useState(false);
    const [onListEdit, setonListEdit] = (0, react_1.useState)(null);
    const [todoLoading, setTodoLoading] = (0, react_1.useState)(false);
    const [ShowTodoLoadingError, setShowTodoLoadingError] = (0, react_1.useState)(false);
    const dialogOpen = () => setShowModal(true);
    const dialogClose = () => setShowModal(false);
    const [Todo, setTodo] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        function loadList() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    setShowTodoLoadingError(false);
                    setTodoLoading(true);
                    const Todo = yield todolistApi.fetchTodoList();
                    setTodo(Todo);
                    console.log(Todo);
                }
                catch (error) {
                    console.log(error);
                    setShowTodoLoadingError(true);
                }
                finally {
                    setTodoLoading(false);
                }
            });
        }
        loadList();
    }, []);
    const { mutate: handleComplete } = (0, react_query_1.useMutation)((list) => {
        return todolistApi.updateStatus(Object.assign(Object.assign({}, list), { status: !list.status }));
    }, {
        onSuccess: (data) => {
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

			{showModal &&
            <AddEditListDialogBox_1.default onListSaved={(newList) => { setTodo([...Todo, newList]); setShowModal(false); }} dialogClose={dialogClose} taskLogo={taskLogo} priorityLogo={priorityLogo} dateTimeLogo={dateTimeLogo}/>}
			{onListEdit &&
            <AddEditListDialogBox_1.default onListSaved={(updatedTodo) => {
                    setTodo(Todo.map(existingTodo => existingTodo._id === updatedTodo._id ? updatedTodo : existingTodo));
                    setonListEdit(null);
                }} onListEdit={onListEdit} dialogClose={dialogClose} taskLogo={taskLogo} priorityLogo={priorityLogo} dateTimeLogo={dateTimeLogo}/>}

			{todoLoading && <Spinner_1.default />}
			{ShowTodoLoadingError && <p>SOMETHING WENT WRONG</p>}
			{!todoLoading && !ShowTodoLoadingError &&
            <>
					<div className={Button_module_css_1.default.DialogButtons}>
						<button onClick={dialogOpen} className={`${Button_module_css_1.default.DialogButton} ${Button_module_css_1.default.buttonDesign}`}><md_1.MdFormatListBulletedAdd style={{ fontSize: " 2.3rem", paddingRight: "15px" }}/>ADD NEW TODO LIST</button>
					</div>
					{Todo.length > 0 ?
                    <>


								<div className={TodolistStyle_module_css_1.default.tblcontent}>
									{Todo.map((list, index) => {
                            if (list.updatedAt > list.createdAt) {
                                createdUpdatedDate = "Updated: " + (0, formatDate_1.formatDate)(list.updatedAt);
                            }
                            else {
                                createdUpdatedDate = "Created: " + (0, formatDate_1.formatDate)(list.createdAt);
                            }
                            return <>
											<table>
												<tr key={list._id} className={`priority-${list.priority}-${list.status}`}>
												<th key={index} style={{ borderBottom: "3px solid #91d1d3" }}>
													<td className={TodolistStyle_module_css_1.default.Numbering}>{index + 1}</td>
												<th className={TodolistStyle_module_css_1.default.textBox} role="textbox">task: {list.task}</th>
												<td style={{ display: "flex", marginLeft: "auto", paddingTop: "20px" }}>
													<td className={TodolistStyle_module_css_1.default.iconPopup}><ai_1.AiOutlineFileDone onClick={(e) => { handleComplete(list); e.stopPropagation(); }} className={Icons_module_css_1.default.ico}/><span>MARK AS DONE</span></td>
													<td className={TodolistStyle_module_css_1.default.iconPopup}><fa_2.FaEdit onClick={() => setonListEdit(list)} className={Icons_module_css_1.default.ico}/><span>UPDATE</span></td>
													<td className={TodolistStyle_module_css_1.default.iconPopup}><fa_1.FaTrash onClick={(e) => { deleteList(list); e.stopPropagation(); }} className={Icons_module_css_1.default.ico}/><span>DELETE</span></td>
													</td>
												</th>
													
													<th><td style={{ margin: "auto" }}>Date created: {(0, formatDate_1.formatDate)(createdUpdatedDate)}</td> {list.duedate ? (<td style={{ margin: "auto" }}>time to complete: {(0, formatDate_1.formatDate)(list.duedate)}</td>) : (<td style={{ margin: "auto" }}>time to complete: NO DATE ASSIGNED</td>)}</th>
												</tr>
											</table>
                                {/*
                                                                            <table>
                                                                                <tr key={list._id} className={`priority-${list.priority}`}>
                                                                                    <th key={index} >{index + 1}</th>
                                                                                    <th>task:
                                                                                        <td className={styles.textBox} role="textbox" style={{ resize: list.task && list.task.length > 20 ? 'vertical' : 'none' }}> {list.task}</td>
                                                                                        <h1 style={{ display: "flex", flexDirection: "column" }}>date created <h2>{formatDate(createdUpdatedDate)}</h2></h1>
                                                                                    </th>
                                
                                                                                    <th>time to complete  {
                                                                                        list.duedate ? (<td>{formatDate(list.duedate)}</td>) : (<td>NO DATE ASSIGNED</td>)
                                                                                    }
                                                                                    </th>
                                                                                    <th>priority<td>{list.priority}</td></th>
                                                                                    <th>Status
                                                                                        {
                                                                                            list.status ? (<td>Completed</td>) : (<td>Incomplete</td>)
                                                                                        }</th>
                                                                                    <th style={{ borderBottom: "none" }}>action <td style={{ display: "flex", gap: "15px" }}>
                                                                                        <MarkAsDone onClick={(e) => { handleComplete(list); e.stopPropagation(); }} className={stylesicons.ico} />
                                                                                        <FaEdit onClick={() => setonListEdit(list)} className={stylesicons.ico} />
                                                                                        <FaTrash onClick={(e) => { deleteList(list); e.stopPropagation(); }} className={stylesicons.ico} />
                                                                                    </td></th>
                                                                                </tr>
                                                                            </table> */}

										</>;
                        })}

								</div>

							</> : <div id={NotFoundPage_module_css_1.default.MainContainer}>
        <div className={NotFoundPage_module_css_1.default.MainContainer}>
            <div className={NotFoundPage_module_css_1.default.TextContent}>
           
                <h1><span>N</span><span>O</span><span>T</span><span>O</span><span>D</span><span>O</span> <span>A</span><span>D</span><span>D</span><span>E</span><span>D</span></h1>
            </div>

        </div>
    </div>}
				</>}




		</>);
};
exports.default = Todolist;
//# sourceMappingURL=Todolist.jsx.map