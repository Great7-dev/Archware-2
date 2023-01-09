"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
/* GET users listing. */
router.post('/create', userController_1.createCampaign);
router.put('/update/:id', userController_1.updateCampaign);
router.get('/getall', userController_1.getCampaign);
router.get('/get/:id', userController_1.getOneCamp);
const upload = (0, multer_1.default)({ dest: "./uploads/" });
router.post("/upload", upload.single("testImage"), userController_1.uploadImage);
exports.default = router;
