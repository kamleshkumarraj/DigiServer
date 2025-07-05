import {Router} from 'express';
import { loginFaculty, registerFaculty } from '../controllers/faculty.controller.js';
import { upload } from '../middlewares/uploadFile.js';

export const facultyRouters = Router();

facultyRouters.route('/register').post(upload.single("avatar"),registerFaculty);
facultyRouters.route('/login').post(loginFaculty);