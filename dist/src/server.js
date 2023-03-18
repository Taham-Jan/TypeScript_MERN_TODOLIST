"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = validateEnv_1.default.PORT;
mongoose_1.default.connect(validateEnv_1.default.MONGO_URI)
    .then(() => {
    console.log("MONGOOSE CONNECTED");
    app_1.default.listen(port, () => {
        console.log("server running at port " + port);
    });
})
    .catch(console.error);
