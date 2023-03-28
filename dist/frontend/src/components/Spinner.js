"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Spinner_module_css_1 = __importDefault(require("../styles/Spinner.module.css"));
function Spinner() {
    return (<div className={Spinner_module_css_1.default.spinnerCenter}>
            <div id={Spinner_module_css_1.default.container}>
                <svg viewBox="0 0 100 100">
                    <defs>
                        <filter id="shadow">
                            <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="var(--primary-color)"/>
                        </filter>
                    </defs>
                    <circle id={Spinner_module_css_1.default.spinner} style={{ fill: "transparent", stroke: "var(--secondary-color)", strokeWidth: "7px", strokeLinecap: "round", filter: "url(#shadow)" }} cx="50" cy="50" r="45"/>
                </svg>
            </div>
        </div>);
}
exports.default = Spinner;
//# sourceMappingURL=Spinner.js.map