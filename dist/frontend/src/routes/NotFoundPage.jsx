"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundPage_module_css_1 = __importDefault(require("../styles/NotFoundPage.module.css"));
const NotFoundPage = () => {
    return (<div id={NotFoundPage_module_css_1.default.MainContainer}>
        <div className={NotFoundPage_module_css_1.default.MainContainer}>
            <div className={NotFoundPage_module_css_1.default.TextContent}>
                <h3>Oops! Page not found</h3>
                <h1><span>4</span><span>0</span><span>4</span></h1>
            </div>
            <h2>we are sorry, but the page you requested was not found</h2>
        </div>
    </div>);
};
exports.default = NotFoundPage;
//# sourceMappingURL=NotFoundPage.jsx.map