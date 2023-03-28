"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_module_css_1 = __importDefault(require("../../styles/Button.module.css"));
const NavbarLoggedOutView = ({ onLoginClicked, onSignUpClicked }) => {
    return (<>
        <div className={Button_module_css_1.default.DialogButtons}>
            <button onClick={onSignUpClicked} className={`${Button_module_css_1.default.DialogButton} ${Button_module_css_1.default.buttonDesign}`}>
                {/* <AddNewTodo style={{ fontSize: " 2.3rem", paddingRight: "15px" }} /> */}
                SIGNUP
                </button>
                <button onClick={onLoginClicked} className={`${Button_module_css_1.default.DialogButton} ${Button_module_css_1.default.buttonDesign}`}>
                {/* <AddNewTodo style={{ fontSize: " 2.3rem", paddingRight: "15px" }} /> */}
                LOGIN
                </button>
              

    </div>  </>);
};
exports.default = NavbarLoggedOutView;
//# sourceMappingURL=NavbarLoggedOutView.jsx.map