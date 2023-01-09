import express ,{Request, Response, NextFunction} from 'express';
import { createCampaign, getCampaign, getOneCamp, updateCampaign, uploadImage } from '../controller/userController';
// import { ImageModel } from '../models/multer';
import fs from "fs"
import multer from "multer"


const router = express.Router();

/* GET users listing. */
router.post('/create', createCampaign)
router.put('/update/:id', updateCampaign)
router.get('/getall', getCampaign)
router.get('/get/:id', getOneCamp)

const upload = multer({ dest: "./uploads/" });

router.post("/upload", upload.single("testImage"), uploadImage);


export default router;
