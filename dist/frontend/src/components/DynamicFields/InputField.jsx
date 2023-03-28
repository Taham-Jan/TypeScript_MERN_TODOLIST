"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_bootstrap_1 = require("react-bootstrap");
const InputField = (_a) => {
    var { name, label, register, registerOptions, error } = _a, props = __rest(_a, ["name", "label", "register", "registerOptions", "error"]);
    return (<react_bootstrap_1.Form.Group className="mb-3" controlId={name + "-input"}>
            <react_bootstrap_1.Form.Label>{label}</react_bootstrap_1.Form.Label>
            <react_bootstrap_1.Form.Control {...props} {...register(name, registerOptions)} isInvalid={!!error}/>
            <react_bootstrap_1.Form.Control.Feedback type="invalid">
                {error === null || error === void 0 ? void 0 : error.message}
            </react_bootstrap_1.Form.Control.Feedback>
        </react_bootstrap_1.Form.Group>);
};
exports.default = InputField;
//# sourceMappingURL=InputField.jsx.map