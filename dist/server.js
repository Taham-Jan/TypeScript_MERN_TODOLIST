"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const express_1 = __importDefault(require("express"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path_1 = __importDefault(require("path"));
const port = validateEnv_1.default.PORT;
app_1.default.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/build')));
app_1.default.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "frontend", "build", "index.html"));
});
mongoose_1.default.connect(validateEnv_1.default.MONGO_URI)
    .then(() => {
    console.log("MONGOOSE CONNECTED");
    app_1.default.listen(port, () => {
        console.log("server running at port " + port);
    });
})
    .catch(console.error);
//# sourceMappingURL=server.js.map