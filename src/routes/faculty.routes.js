import {Router} from 'express';
import { registerFaculty } from '../controllers/faculty.controller.js';

export const facultyRouters = Router();

facultyRouters.route('/register').post(registerFaculty);