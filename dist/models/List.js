"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const listSchema = new mongoose_1.Schema({
    task: {
        type: String,
        required: true,
    },
    priority: {
        type: Array,
        required: true,
    },
    duedate: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Todo List", listSchema);
//# sourceMappingURL=List.js.map