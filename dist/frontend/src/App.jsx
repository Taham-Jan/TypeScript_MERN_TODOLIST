"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.css");
const react_query_1 = require("react-query");
const Homescreen_1 = require("./routes/Homescreen");
const queryClient = new react_query_1.QueryClient();
function App() {
    return (<>
      <react_query_1.QueryClientProvider client={queryClient}>
        <Homescreen_1.Homescreen />
      </react_query_1.QueryClientProvider>
    </>);
}
exports.default = App;
//# sourceMappingURL=App.jsx.map