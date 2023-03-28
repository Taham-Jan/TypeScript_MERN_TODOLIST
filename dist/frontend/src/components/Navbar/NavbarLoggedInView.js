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
const ListApi = __importStar(require("../../api/todolist_api"));
const react_bootstrap_1 = require("react-bootstrap");
const Button_module_css_1 = __importDefault(require("../../styles/Button.module.css"));
const NavbarLoggedInView = ({ user, onLogoutSuccessful }) => {
    function logout() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ListApi.logout();
                onLogoutSuccessful();
            }
            catch (error) {
                console.log(error);
                alert(error);
            }
        });
    }
    return (<>
            <react_bootstrap_1.Navbar.Text style={{ color: "var(--secondary-color)" }}>
                Signed in as: {user.username}
            </react_bootstrap_1.Navbar.Text>
            <div className={Button_module_css_1.default.DialogButtons}>
                <button onClick={logout} className={`${Button_module_css_1.default.DialogButton} ${Button_module_css_1.default.buttonDesign}`}>
                    {/* < style={{ fontSize: " 2.3rem", paddingRight: "15px" }} /> */}
                    LOGOUT
                    </button>
            </div>
            
            </>);
};
exports.default = NavbarLoggedInView;
//# sourceMappingURL=NavbarLoggedInView.js.map