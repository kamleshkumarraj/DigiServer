import {Router} from 'express';
import { registerFaculty } from '../controllers/faculty.controller.js';
import { upload } from '../middlewares/uploadFile.js';

export const facultyRouters = Router();

facultyRouters.route('/register').post(upload.single("avatar"),registerFaculty);