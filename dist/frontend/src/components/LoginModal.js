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
const react_hook_form_1 = require("react-hook-form");
const ListApi = __importStar(require("../api/todolist_api"));
const react_1 = require("react");
const fa_1 = require("react-icons/fa");
const ri_1 = require("react-icons/ri");
const Icons_module_css_1 = __importDefault(require("../styles/Icons.module.css"));
const LoginModal = ({ dialogClose, onLoginSuccessfull }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = (0, react_hook_form_1.useForm)();
    function onSubmit(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield ListApi.login(credentials);
                onLoginSuccessfull(user);
            }
            catch (error) {
                alert(error);
                console.log(error);
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
					<h1 className={TodolistStyle_module_css_1.default.HeadingModal}>
						LOGIN
					</h1>
					<div className={TodolistStyle_module_css_1.default.flexrow}>
						<label className={TodolistStyle_module_css_1.default.label} htmlFor="Username">
							<fa_1.FaUser className={Icons_module_css_1.default.ico2}/>
							<label className={TodolistStyle_module_css_1.default.placeholder}>Username</label>
						</label>
						<input type="text" id="username" className={TodolistStyle_module_css_1.default.input} placeholder='Enter your username... ' {...register("username", { required: "dyy bhai" })}/>
					</div>
					<div className={TodolistStyle_module_css_1.default.flexrow}>
						<label className={TodolistStyle_module_css_1.default.label} htmlFor="Password">
							<ri_1.RiLockPasswordFill className={Icons_module_css_1.default.ico2}/>
							<label className={TodolistStyle_module_css_1.default.placeholder}>Password</label>
						</label>
						<input type="password" id="password" className={TodolistStyle_module_css_1.default.input} placeholder='Enter your password...' {...register("password", { required: "dyy bhai" })}/>
					</div>
					<div className={Button_module_css_1.default.DialogButtons}>
						<button className={`${Button_module_css_1.default.DialogButton} ${Button_module_css_1.default.buttonDesign}`} type="submit" disabled={isSubmitting}>LOGIN</button>
						<button onClick={dialogClose} className={`${Button_module_css_1.default.DialogButton} ${Button_module_css_1.default.buttonDesign}`}>Close</button>
					</div>
				</div>
			</form>
		</>);
};
exports.default = LoginModal;
//# sourceMappingURL=LoginModal.js.map