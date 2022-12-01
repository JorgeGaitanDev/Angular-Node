"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citas_1 = require("../controllers/citas");
const router = (0, express_1.Router)();
router.get("/", citas_1.getCitas);
exports.default = router;
