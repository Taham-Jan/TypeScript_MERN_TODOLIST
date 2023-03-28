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
exports.Homescreen = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const todolistApi = __importStar(require("../api/todolist_api"));
const LoginModal_1 = __importDefault(require("../components/LoginModal"));
const NavbarComponent_1 = __importDefault(require("../components/Navbar/NavbarComponent"));
const SignUpModal_1 = __importDefault(require("../components/SignUpModal"));
const Spinner_1 = __importDefault(require("../components/Spinner"));
const TodolistStyle_module_css_1 = __importDefault(require("../styles/TodolistStyle.module.css"));
const NotFoundPage_1 = __importDefault(require("./NotFoundPage"));
const PrivacyPage_1 = __importDefault(require("./PrivacyPage"));
const TodoListPage_1 = __importDefault(require("./TodoListPage"));
const react_use_localstorage_1 = __importDefault(require("react-use-localstorage"));
const datetimeB_svg_1 = __importDefault(require("../assets/datetimeB.svg"));
const datetimeW_svg_1 = __importDefault(require("../assets/datetimeW.svg"));
const moon_svg_1 = __importDefault(require("../assets/moon.svg"));
const priorityB_svg_1 = __importDefault(require("../assets/priorityB.svg"));
const priorityW_svg_1 = __importDefault(require("../assets/priorityW.svg"));
const sun_svg_1 = __importDefault(require("../assets/sun.svg"));
const taskB_svg_1 = __importDefault(require("../assets/taskB.svg"));
const taskW_svg_1 = __importDefault(require("../assets/taskW.svg"));
const Homescreen = () => {
    // THEME
    const todoCover = require('../assets/TODO-LIST.jpg');
    const todoCoverDark = require('../assets/TODO-LIST-D.jpg');
    const [themeLogo, setThemeLogo] = (0, react_use_localstorage_1.default)("themeLogo", moon_svg_1.default);
    const [taskLogo, setTaskLogo] = (0, react_use_localstorage_1.default)("taskLogo", taskW_svg_1.default);
    const [priorityLogo, setpriorityLogo] = (0, react_use_localstorage_1.default)('priorityLogo', priorityW_svg_1.default);
    const [dateTimeLogo, setdateTimeLogo] = (0, react_use_localstorage_1.default)('dateTimeLogo', datetimeW_svg_1.default);
    const [todoHeader, setTodoHeader] = (0, react_use_localstorage_1.default)("todoHeader", todoCover);
    const [theme, setTheme] = (0, react_use_localstorage_1.default)("theme", "light-theme");
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
    const [loggedInUser, SetloggedInUser] = (0, react_1.useState)(null);
    const [showSignUpModal, setShowSignUpModal] = (0, react_1.useState)(false);
    const [showLoginModal, setShowLoginModal] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        function fetchLoggedInUser() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield todolistApi.fetchLoggedInUser();
                    SetloggedInUser(user);
                }
                catch (error) {
                    console.log(error);
                }
            });
        }
        fetchLoggedInUser();
    }, []);
    return (<>
    
      <react_router_dom_1.BrowserRouter>
        <react_1.Suspense fallback={<Spinner_1.default />}>
               
          <div className={TodolistStyle_module_css_1.default.letter}>

            <div className={TodolistStyle_module_css_1.default.paper}>
              <div className={TodolistStyle_module_css_1.default.papercontent}>
                <div className={TodolistStyle_module_css_1.default.mainContent}>

                  {showSignUpModal && <SignUpModal_1.default dialogClose={() => setShowSignUpModal(false)} onSignUpSuccessfull={(user) => { SetloggedInUser(user); setShowSignUpModal(false); }}/>}
                  {showLoginModal && <LoginModal_1.default dialogClose={() => setShowLoginModal(false)} onLoginSuccessfull={(user) => { SetloggedInUser(user); setShowLoginModal(false); }}/>}
                  <div>

                    <img className={TodolistStyle_module_css_1.default.letterimg} src={todoHeader} alt="ICON"/>
                    <NavbarComponent_1.default loggedInUser={loggedInUser} onLoginClicked={() => setShowLoginModal(true)} onLogoutSuccessful={() => SetloggedInUser(null)} onSignUpClicked={() => setShowSignUpModal(true)}/>

                    <img src={themeLogo} id='moonlogo' alt=' ' onClick={() => toggleTheme()}/>
                    <react_router_dom_1.Routes>
                      <react_router_dom_1.Route path="/" element={<TodoListPage_1.default loggedInUser={loggedInUser} dateTimeLogo={dateTimeLogo} priorityLogo={priorityLogo} taskLogo={taskLogo}/>}/>
                      <react_router_dom_1.Route path="privacy" element={<PrivacyPage_1.default />}/>
                      <react_router_dom_1.Route path="/*" element={<NotFoundPage_1.default />}/>
                    </react_router_dom_1.Routes>

                  </div>


                </div>
                <br></br>
              </div>
            </div>
          </div>

        </react_1.Suspense>
      </react_router_dom_1.BrowserRouter>
    </>);
};
exports.Homescreen = Homescreen;
//# sourceMappingURL=Homescreen.jsx.map